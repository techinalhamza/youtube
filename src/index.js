import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

  connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on Port ${process.env.PORT}`);
      console.log(`MONGODB_URI IS ${process.env.MONGODB_URI}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection Error" + " " + error);
  });
