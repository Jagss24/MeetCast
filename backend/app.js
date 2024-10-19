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
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
  path: "/socket.io",
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
  res.send("Hello in MeetCast");
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

    if (clients.length > 0) {
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.ADD_PEER, {
          peerId: socket.id,
          createOffer: false,
          user,
        });

        socket.emit(ACTIONS.ADD_PEER, {
          peerId: clientId,
          createOffer: true,
          user: socketUserMap[clientId],
        });
      });
    }

    // Join the room, (the reason we wrote this here is because we don't want the socket.emit to emit function for itself and createOffer for itself also that's why after getting all the clients in which that specific user is not present the user will join the room)
    socket.join(roomId);
  });

  // Handle ice canidate that are sent from client to server
  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  // Handle SDP's that are sent from client to server
  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  // Video Status changed so let all users know it
  socket.on(ACTIONS.TOGGLE_VIDEO, ({ userId, isVideoOn, isAudioOn }) => {
    let userFound = false;

    // Iterate over the socketUserMap to find the user by userId
    for (const clientId in socketUserMap) {
      if (socketUserMap[clientId].id === userId) {
        // Update the isAudioOn status for the found user
        socketUserMap[clientId].isVideoOn = isVideoOn;
        socketUserMap[clientId].isAudioOn = isAudioOn;
        userFound = true;
        break;
      }
    }

    if (userFound) {
      // Broadcast the updated audio status to all clients
      socket.broadcast.emit(ACTIONS.VIDEO_STATUS, {
        userId,
        isVideoOn,
        isAudioOn,
      });
    } else {
      console.warn(`User with ID ${userId} not found in socketUserMap.`);
    }
  });

  // Audio Status changed so let all users know it
  socket.on(ACTIONS.TOGGLE_AUDIO, ({ userId, isAudioOn, isVideoOn }) => {
    let userFound = false;

    // Iterate over the socketUserMap to find the user by userId
    for (const clientId in socketUserMap) {
      if (socketUserMap[clientId].id === userId) {
        // Update the isAudioOn status for the found user
        socketUserMap[clientId].isAudioOn = isAudioOn;
        socketUserMap[clientId].isVideoOn = isVideoOn;
        userFound = true;
        break;
      }
    }

    if (userFound) {
      // Broadcast the updated audio status to all clients
      socket.broadcast.emit(ACTIONS.AUDIO_STATUS, {
        userId,
        isAudioOn,
        isVideoOn,
      });
    } else {
      console.warn(`User with ID ${userId} not found in socketUserMap.`);
    }
  });

  // Handle message to send to all clients
  socket.on(
    ACTIONS.SEND_MSG,
    ({ userId, userFullName, userAvatar, msgContent }) => {
      socket.broadcast.emit(ACTIONS.RECEIVE_MSG, {
        userId,
        userFullName,
        userAvatar,
        msgContent,
      });
    }
  );

  const leaveRoom = ({ roomId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    console.log({ clients });
    clients.forEach((clientId) => {
      if (clientId !== socket.id) {
        console.log(socketUserMap[clientId]?.userName);
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
          userName: socketUserMap[socket.id]?.userName,
        });
      }
    });
    socket.emit(ACTIONS.REMOVE_PEER, {
      peerId: socket.id,
      userId: socketUserMap[socket.id]?.id,
      userName: socketUserMap[socket.id]?.userName,
    });
    socket.leave(roomId);
    delete socketUserMap[socket.id];

    console.log("map", socketUserMap);
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);

  socket.on("disconnecting", leaveRoom);
});

server.listen("3000", () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
