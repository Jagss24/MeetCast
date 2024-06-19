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

const app = express();
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
app.listen("3000", () => {
  console.log(process.env.PORT);
  console.log("Server Listen");
});
