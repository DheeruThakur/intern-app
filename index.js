const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Routes = require("./routes/route");

app.use(express.json());
app.use("/", Routes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("database connected successfully");
  app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
  });
});
