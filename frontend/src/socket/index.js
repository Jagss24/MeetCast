import { io } from "socket.io-client";

export const socketInit = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
    path: "/api/socket",
  };

  return io(import.meta.env.VITE_BACKEND_URL, options);
};
