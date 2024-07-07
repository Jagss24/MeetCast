import express from "express";
import dotenv from "dotenv";
dotenv.config();
import conn from "./conn.js";
import cors from "cors";
const mongoURI = process.env.MONGO_URI;
conn(mongoURI);
import authenticate from "./routes/authenticate.js";
import rooms from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { ACTIONS } from "./actions.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use("/authenticate", authenticate);
app.use("/rooms", rooms);
app.get("/", (req, res) => {
  res.send("Hello");
});

// Sockets
const socketUserMap = {};

io.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMap[socket.id] = user;

    // console.log('Map', socketUserMap);

    // get all the clients from io adapter
    // console.log('joining');
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    // console.log('All connected clients', clients, io.sockets.adapter.rooms);
    // Add peers and offers and all

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });

      // Send myself as well that much msgs how many clients

      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMap[clientId],
      });
    });

    // Join the room
    socket.join(roomId);
  });

  // Handle Relay Ice event
  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  // Handle Relay SDP
  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  const leaveRoom = () => {
    const { rooms } = socket;
    console.log("leaving", rooms);
    // console.log('socketUserMap', socketUserMap);
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
        });

        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: clientId,
          userId: socketUserMap[clientId]?.id,
        });

        socket.leave(roomId);
      });
    });

    delete socketUserMap[socket.id];

    console.log("map", socketUserMap);
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);

  socket.on("disconnecting", leaveRoom);
});

server.listen("3000", () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
