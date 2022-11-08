import { app } from "./server.js";
import mongoose from "mongoose";

// * set database config
const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };

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

// * not in use when mongodb is ser up
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Project!" });
// });
