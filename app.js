import express from "express";
import mongoose from "mongoose";
import tasksRoutes from "./tasksRoutes.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.clear();
  next();
});
try {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Connected to Database");

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
} catch (e) {
  console.log(e.message);
}

app.use("/tasks", tasksRoutes);
