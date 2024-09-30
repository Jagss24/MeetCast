import { useEffect, useRef, useCallback, useState } from "react";
import { ACTIONS } from "../actions";
import { socketInit } from "../socket";
import freeice from "freeice";
import { useStateWithCallback } from "./useStateWithCallback";
import toast from "react-hot-toast";

export const usePodCast = ({
  roomId,
  user,
  isSpeaker = false,
  isOwner = false,
  showToastFunc = () => {},
}) => {
  const [clients, setClients] = useStateWithCallback([]);
  const [clientMessages, setClientMessages] = useState([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const socket = useRef(null);
  const localMediaStream = useRef(null);
  const senders = useRef([]);
  const clientIds = useRef(new Set());
  //this state is used to check whther the user has joined and added all the remote users that were present earlier if yes then it will becomes true
  //usecase:- to show toast message
  const [userJoinedSuccessFully, setUserJoinedSuccessFully] = useState(false);

  const audioContext = new window.AudioContext();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  const dataArray = new Uint8Array(analyser.fftSize);
  let monitoring = true;

  // Functions
  const addNewClient = useCallback(
    (newClient, cb) => {
      // if client is not present only then add new client
      if (!clientIds.current.has(newClient?.id)) {
        clientIds.current.add(newClient?.id);

        setClients((existingClients) => {
          if (newClient?.isOwner) {
            return [newClient, ...existingClients];
          } else if (newClient?.isSpeaker) {
            if (existingClients.length && existingClients[0]?.isOwner) {
              return [
                existingClients[0],
                newClient,
                ...existingClients.slice(1),
              ];
            } else {
              return [newClient, ...existingClients];
            }
          } else {
            return [...existingClients, newClient];
          }
        }, cb);
      }
    },
    [setClients]
  );

  const handleAudio = (userId) => {
    try {
      const audioTrack = localMediaStream.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;

      setClients((clients) =>
        clients.map((client) => {
          if (client.id === userId) {
            return { ...client, isAudioOn: audioTrack.enabled };
          }
          return client;
        })
      );

      // Broadcast the audio status change to all peers
      socket.current.emit(ACTIONS.TOGGLE_AUDIO, {
        userId,
        isAudioOn: audioTrack.enabled,
      });
      // Update the local video element
      const localElement = audioElements.current[user.id];
      if (localElement) {
        localElement.srcObject = new MediaStream([audioTrack]);
      }
    } catch (error) {
      toast("Some issue occured in starting audio");
    }
  };

  const monitorVolume = () => {
    if (!monitoring) return;

    requestAnimationFrame(monitorVolume);

    analyser.getByteFrequencyData(dataArray);
  };

  const sendMessage = ({ userId, msgContent, userFullName, userAvatar }) => {
    if (!userId && !msgContent && !userFullName) return;

    setClientMessages((prev) => [
      ...prev,
      { userId, userFullName, userAvatar, msgContent },
    ]);

    socket.current.emit(ACTIONS.SEND_MSG, {
      userId,
      userFullName,
      userAvatar,
      msgContent,
    });
  };

  // useEffects

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  // Get the video & audio of user as soon as user gets connected
  useEffect(() => {
    const startCapture = async () => {
      // Start capturing local video stream.
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const audioTracks = localMediaStream.current.getAudioTracks()[0];
      audioTracks.enabled = false;

      const source = audioContext.createMediaStreamSource(
        localMediaStream.current
      );
      source.connect(analyser);

      monitorVolume();
    };

    startCapture().then(() => {
      const updatedUser = { ...user, isSpeaker, isOwner };
      // add user to clients list
      addNewClient(updatedUser, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }
      });
      // Emit the action to join
      socket.current.emit(ACTIONS.JOIN, {
        roomId,
        user: updatedUser,
      });
    });

    // Leaving the room
    return () => {
      localMediaStream.current.getTracks().forEach((track) => track.stop());
      socket.current.emit(ACTIONS.LEAVE, { roomId });
      if (audioContext.state !== "closed") {
        audioContext.close().then(() => {
          monitoring = false;
        });
      }
    };
  }, []);

  // Handle new peer

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      // If already connected then prevent connecting again
      if (peerId in connections.current) {
        return;
      }

      // If user is new then store it to connections
      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      // Handle new ice candidate on this peer connection
      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };

      // Handle on track event on this connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        if (userJoinedSuccessFully) {
          showToastFunc({ remoteUser });
        }
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser?.id]) {
            audioElements.current[remoteUser?.id].srcObject = remoteStream;
          } else {
            //Checking again nd again on 1 sec interval till user get's the remoteStream and set it as its own stream.
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser?.id]) {
                audioElements.current[remoteUser?.id].srcObject = remoteStream;
                settled = true;
              }

              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      // Add connection to peer connections track
      localMediaStream.current.getTracks().forEach((track) => {
        // Also push the connection in senders so that we can replace tracks.
        senders.current.push(
          connections.current[peerId].addTrack(track, localMediaStream.current)
        );
      });

      // Create an offer if required
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();

        // Set as local description
        await connections.current[peerId].setLocalDescription(offer);

        // send offer to the server
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
      setUserJoinedSuccessFully(true);
    };

    // Listen for add peer event from ws
    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
    return () => {
      socket.current.off(ACTIONS.ADD_PEER);
    };
  }, [clients]);

  // Handle ice candidate that are sent from server to client
  useEffect(() => {
    socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      // Add the icecanidate of another user in our ice candiates
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });

    return () => {
      socket.current.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  // Handle SDP that are sent from server to client
  useEffect(() => {
    const setRemoteMedia = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );

      // If session descrition is offer then create an answer
      if (remoteSessionDescription.type === "offer") {
        const connection = connections.current[peerId];

        const answer = await connection.createAnswer();
        connection.setLocalDescription(answer);

        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };

    socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
    return () => {
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  // If audio status is changed of any user let all other user know it
  useEffect(() => {
    const handleAudioStatusChanged = ({ userId, isAudioOn }) => {
      setClients((clients) =>
        clients.map((client) => {
          if (client.id === userId) {
            return { ...client, isAudioOn };
          }
          return client;
        })
      );
    };

    socket.current.on(ACTIONS.AUDIO_STATUS, handleAudioStatusChanged);

    return () => {
      socket.current.off(ACTIONS.AUDIO_STATUS, handleAudioStatusChanged);
    };
  }, []);

  // Get the messages sent by other clients
  useEffect(() => {
    const handleRecivedMsg = ({
      userId,
      userFullName,
      userAvatar,
      msgContent,
    }) => {
      setClientMessages((prev) => [
        ...prev,
        { userId, userFullName, userAvatar, msgContent },
      ]);
    };
    socket.current.on(ACTIONS.RECEIVE_MSG, handleRecivedMsg);

    return () => {
      socket.current.off(ACTIONS.RECEIVE_MSG, handleRecivedMsg);
    };
  }, []);
  // If browser is close directly then this will be triggered
  useEffect(() => {
    window.addEventListener("unload", function () {
      alert("leaving");
      socket.current.emit(ACTIONS.LEAVE, { roomId });
    });
  }, []);
  const leaveRoom = () => {
    socket.current.emit(ACTIONS.LEAVE, { roomId });
  };

  // To remove the peer from connection.
  useEffect(() => {
    const handleRemovePeer = ({ peerID, userId }) => {
      if (connections.current[peerID]) {
        connections.current[peerID].close();
      }

      delete connections.current[peerID];
      delete audioElements.current[peerID];

      setClients((list) => list.filter((c) => c.id !== userId));
      const updatedClientIds = new Set(
        [...clientIds.current].filter((id) => id !== userId)
      );
      clientIds.current = updatedClientIds;
    };

    socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socket.current.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  // reference for video elemenets controlled through user Id.
  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return {
    clients,
    provideRef,
    leaveRoom,
    handleAudio,
    sendMessage,
    clientMessages,
  };
};
