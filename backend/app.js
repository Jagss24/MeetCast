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
import http, { METHODS } from "http";
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
const socketUserMapping = {};
io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;

    //new Map:- To check which clients are present in the room
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADDPEER, {});
    });

    socket.emit(ACTIONS.ADDPEER);

    socket.join(roomId);
    console.log({ clients });
  });
});

server.listen("3000", () => {
  console.log(process.env.PORT);
  console.log("Server Listen");
});
