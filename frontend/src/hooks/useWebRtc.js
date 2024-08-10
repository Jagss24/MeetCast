import { useEffect, useState, useRef, useCallback } from "react";
import { ACTIONS } from "../actions";
import { socketInit } from "../socket";
import freeice from "freeice";
import { useStateWithCallback } from "./useStateWithCallback";

export const useWebRTC = ({ roomId, user }) => {
  const [clients, setClients] = useStateWithCallback([]);
  const [clientMessages, setClientMessages] = useState([]);
  const videoElements = useRef({});
  const connections = useRef({});
  const screenShareStream = useRef(null);
  const socket = useRef(null);
  const localMediaStream = useRef(null);
  const senders = useRef([]);
  const clientIds = useRef(new Set());
  const [isUserSpeaking, setisUserSpeaking] = useState(false);

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
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [setClients]
  );

  const monitorVolume = () => {
    if (!monitoring) return;

    requestAnimationFrame(monitorVolume);

    analyser.getByteFrequencyData(dataArray);
    const averageVolume =
      dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

    if (averageVolume > 10) {
      // Adjust the threshold value as needed
      setisUserSpeaking(true);
    } else {
      setisUserSpeaking(false);
    }
  };

  const handleVideo = (userId) => {
    try {
      const audioTrack = localMediaStream.current.getAudioTracks()[0];

      const videoTrack = localMediaStream.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;

      setClients((clients) =>
        clients.map((client) => {
          if (client.id === userId) {
            return {
              ...client,
              isAudioOn: audioTrack.enabled,
              isVideoOn: videoTrack.enabled,
            };
          }
          return client;
        })
      );

      // Broadcast the video status change to all peers
      socket.current.emit(ACTIONS.TOGGLE_VIDEO, {
        userId,
        isVideoOn: videoTrack.enabled,
        isAudioOn: audioTrack.enabled,
      });
      // Update the local video element
      const localElement = videoElements.current[user.id];
      if (localElement) {
        localElement.srcObject = new MediaStream([
          videoTrack,
          ...localMediaStream.current.getAudioTracks(),
        ]);
      }
    } catch (error) {
      console.error("Error starting video: ", error);
    }
  };

  const handleAudio = (userId) => {
    try {
      const audioTrack = localMediaStream.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;

      const videoTrack = localMediaStream.current.getVideoTracks()[0];

      setClients((clients) =>
        clients.map((client) => {
          console.log({ client });
          if (client.id === userId) {
            return {
              ...client,
              isAudioOn: audioTrack.enabled,
              isVideoOn: videoTrack.enabled,
            };
          }
          return client;
        })
      );

      // Broadcast the audio status change to all peers
      socket.current.emit(ACTIONS.TOGGLE_AUDIO, {
        userId,
        isAudioOn: audioTrack.enabled,
        isVideoOn: videoTrack.enabled,
      });

      // Update the local video element
      const localElement = videoElements.current[user.id];
      if (localElement) {
        localElement.srcObject = new MediaStream([
          audioTrack,
          ...localMediaStream.current.getVideoTracks(),
        ]);
      }
    } catch (error) {
      console.error("Error starting audio: ", error);
    }
  };

  const screenSharing = () => {
    let screenTrack;
    const audioTrack = localMediaStream.current?.getAudioTracks()[0];
    //start sharing the screen
    async function startScreenSharing(setscreenIsSharing) {
      try {
        screenShareStream.current =
          await navigator.mediaDevices.getDisplayMedia({
            video: {
              cursor: "always",
              displaySurface: "monitor",
            },
          });

        screenTrack = screenShareStream.current.getTracks()[0];

        // if screen share is started then set isVideon as true so that video element will be display as block
        setClients((clients) =>
          clients.map((client) => {
            if (client.id === user.id) {
              return { ...client, isVideoOn: true };
            }
            return client;
          })
        );

        // Broadcast the video status change to all peers
        socket.current.emit(ACTIONS.TOGGLE_VIDEO, {
          userId: user?.id,
          isVideoOn: true,
          isAudioOn: audioTrack.enabled,
        });
        // Get the screentrack and replace with your video track.
        senders.current
          .find((sender) => sender.track.kind === "video")
          .replaceTrack(screenTrack);

        const localElement = videoElements.current[user.id];
        if (localElement) {
          localElement.srcObject = screenShareStream.current;
        }
        setscreenIsSharing(true);
        // on stop sharing
        screenTrack.onended = function () {
          stopScreenSharing();
        };
      } catch (error) {
        console.error("Error in screen sharing: ", error);
        setscreenIsSharing(false);
      }
    }

    const stopScreenSharing = (setscreenIsSharing) => {
      // Replace your video Track with the screen track.
      senders.current
        .find((sender) => sender.track.kind === "video")
        .replaceTrack(localMediaStream.current.getTracks()[1]);

      // if screen share is stopped then set isVideon as false so that video element will be display as none
      setClients((clients) =>
        clients.map((client) => {
          if (client.id === user.id) {
            return { ...client, isVideoOn: false };
          }
          return client;
        })
      );

      // Broadcast the video status change to all peers
      socket.current.emit(ACTIONS.TOGGLE_VIDEO, {
        userId: user?.id,
        isVideoOn: false,
        isAudioOn: audioTrack.enabled,
      });
      const localElement = videoElements.current[user.id];
      if (localElement) localElement.srcObject = localMediaStream.current;

      setscreenIsSharing(false);
    };

    return { startScreenSharing, stopScreenSharing };
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
        video: true,
        audio: true,
      });

      // By defeault keeps the videoTrack as false
      const videoTracks = localMediaStream.current.getVideoTracks()[0];
      videoTracks.enabled = false;

      const audioTracks = localMediaStream.current.getAudioTracks()[0];
      audioTracks.enabled = false;
    };

    startCapture().then(() => {
      // add user to clients list
      addNewClient(user, () => {
        const localElement = videoElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }
      });

      // Emit the action to join
      socket.current.emit(ACTIONS.JOIN, {
        roomId,
        user,
      });
    });

    // Leaving the room
    return () => {
      localMediaStream.current.getTracks().forEach((track) => track.stop());
      socket.current.emit(ACTIONS.LEAVE, { roomId });
      if (audioContext.state !== "closed") {
        audioContext.close().then(() => {
          console.log("Audio context closed");
        });
        monitoring = false;
      }
    };
  }, []);

  // Handle new peer
  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      // If already connected then prevent connecting again
      if (peerId in connections.current) {
        return console.warn(
          `You are already connected with ${peerId} (${user.name})`
        );
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
        addNewClient(remoteUser, () => {
          if (videoElements.current[remoteUser.id]) {
            videoElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            //Checking again nd again on 1 sec interval till user get's the remoteStream and set it as its own stream.
            let settled = false;
            const interval = setInterval(() => {
              if (videoElements.current[remoteUser.id]) {
                videoElements.current[remoteUser.id].srcObject = remoteStream;
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
    const handleAudioStatusChanged = ({ userId, isAudioOn, isVideoOn }) => {
      setClients((clients) =>
        clients.map((client) => {
          if (client.id === userId) {
            return { ...client, isAudioOn, isVideoOn };
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

  // If video status is changed of any user let all other user know it
  useEffect(() => {
    const handleVideoStatusChanged = ({ userId, isVideoOn, isAudioOn }) => {
      setClients((clients) =>
        clients.map((client) => {
          if (client.id === userId) {
            return { ...client, isVideoOn, isAudioOn };
          }
          return client;
        })
      );
    };

    socket.current.on(ACTIONS.VIDEO_STATUS, handleVideoStatusChanged);

    return () => {
      socket.current.off(ACTIONS.VIDEO_STATUS, handleVideoStatusChanged);
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
    const handleRemovePeer = ({ peerID, userId, userName }) => {
      console.log("leaving", peerID, userId, userName);

      if (connections.current[peerID]) {
        connections.current[peerID].close();
      }

      delete connections.current[peerID];
      delete videoElements.current[peerID];

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
    videoElements.current[userId] = instance;
  };

  return {
    clients,
    provideRef,
    screenSharing,
    handleVideo,
    leaveRoom,
    handleAudio,
    clientIds,
    isUserSpeaking,
    sendMessage,
    clientMessages,
  };
};
