import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstence = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `database connected !! host on ${connectionInstence.connection.host}`
    );
  } catch (error) {
    console.log("database connection error" + " " + error);
  }
};

export default connectDB;
