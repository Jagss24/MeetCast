import express from "express";
import dotenv from "dotenv";
import authenticate from "./routes/authenticate.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use("/authenticate", authenticate);
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen("3000", () => {
  console.log(process.env.PORT);
  console.log("Server Listen");
});
