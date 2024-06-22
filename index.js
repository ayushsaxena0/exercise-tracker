const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cors = require("cors");
const exerciseController = require("./controllers/exerciseController");
require("dotenv").config({ path: "./config/.env" });

connectDB();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/users", exerciseController.getUsers);
app.post("/api/users", exerciseController.postUser);
app.post("/api/users/:_id/exercises", exerciseController.postExercise);
app.get("/api/users/:_id/logs", exerciseController.getLog);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
