import app from "./routes";
import mongoose from "mongoose";
require("dotenv").config();

const connection = process.env.MONGO_URI;

mongoose
  .connect(connection ?? "mongodb://localhost:27017/test")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: " + err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
