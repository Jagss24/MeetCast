import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from "../socket/index";
import { ACTIONS } from "../actions";

const users = [
  {
    id: 1,
    name: "Jagss",
  },
  {
    id: 2,
    name: "Additya",
  },
];

export const useWebRtc = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socketRef = useRef(null);
  console.log({ clients });
  const provideRef = (instance, userId) => {
    if (instance) {
      audioElements.current[userId] = instance;
    }
  };
  useEffect(() => {
    socketRef.current = socketInit();

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  const addNewClients = useCallback(
    (newClient, cb) => {
      const isClientExist = clients.find(
        (client) => client.id === newClient.id
      );

      if (!isClientExist) {
        setClients((existingClient) => [...existingClient, newClient], cb);
      }
    },
    [clients]
  );

  //Capture Media

  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      console.log(user.id);
      if (user?.id) {
        addNewClients(user, () => {
          const localElement = audioElements.current[user.id];
          if (localElement) {
            // localElement.volume = 0;
            localElement.srcObject = localMediaStream.current;
          }

          socketRef.current.emit(ACTIONS.JOIN, {
            roomId,
            user,
          });
        });
      }
    });
  }, [clients, user.id]);

  return { clients, provideRef };
};
