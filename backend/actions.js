export const ACTIONS = {
  JOIN: "join",
  LEAVE: "leave",
  ADD_PEER: "addPeer",
  RELAY_ICE: "relayIce", // we are using this to sent ice candiate from client to server
  RELAY_SDP: "relaySDP", // we are using this to sent sdp from client to server
  ICE_CANDIDATE: "iceCandidate", // we are using this to sent ice candiate from server to client
  SESSION_DESCRIPTION: "sessionDescription", // we are using this to sent sdp from server to client
  REMOVE_PEER: "removePeer",
};
