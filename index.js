import { app } from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

// * set server's address
const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };

// const MONG_URI =
//   "mongodb+srv://Chen:Chen123@cluster0.oqwuc7s.mongodb.net/?retryWrites=true&w=majority";

//  * connect to server MongoDB
mongoose
  .connect(process.env.MONG_URI, dbConfig)
  .then(() => {
    //  * listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connect to MongoDB & Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Project!" });
});




