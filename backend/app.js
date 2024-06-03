import express from "express";
import dotenv from "dotenv";
dotenv.config();
import conn from "./conn.js";
import cors from "cors";
const mongoURI = process.env.MONGO_URI;
conn(mongoURI);
import authenticate from "./routes/authenticate.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use("/authenticate", authenticate);
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen("3000", () => {
  console.log(process.env.PORT);
  console.log("Server Listen");
});
