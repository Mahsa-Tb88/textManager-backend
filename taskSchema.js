import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
