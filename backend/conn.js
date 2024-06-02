import mongoose from "mongoose";

const conn = async (mongoURI) => {
  try {
    mongoose.connect(mongoURI).then(() => {
      console.log("MongoDB Connected");
    });
  } catch (error) {
    console.log(error);
  }
};

export default conn;
