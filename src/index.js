import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection Error" + " " + error);
  });
