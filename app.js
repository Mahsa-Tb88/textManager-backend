import express from "express";
import mongoose from "mongoose";
import tasksRoutes from "./tasksRoutes.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/tasks", tasksRoutes);

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/task");
  console.log("Connected to Database");

  app.listen(3000, () => {
    console.log("Server is running on http://127.0.0.1:27017");
  });
} catch (e) {
  console.log(e.message);
}
