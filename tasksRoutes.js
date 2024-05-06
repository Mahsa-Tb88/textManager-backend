import express from "express";
import Task from "./taskSchema.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json({
        success: true,
        body: task,
        message: "Task fetch successfully!",
        code: 200,
      });
    } else {
      res.status(404).json({
        success: false,
        body: null,
        message: " Task Not Founded",
        code: 404,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      body: null,
      message: e.message,
      code: 500,
    });
  }
});

router.get("/", async (req, res) => {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 4;
  const status = req.query.status ?? "all";
  const search = req.query.search ?? "";

  const startPage = (page - 1) * limit;

  try {
    const query = { title: RegExp(search, "i") };
    if (status == "completed") {
      query.completed = true;
    } else if (status == "in-progress") {
      query.completed = false;
    }
    const tasks = await Task.find(query)
      .limit(limit)
      .skip(startPage)
      .sort("title");

    const all = await Task.countDocuments();
    const filtered = await Task.countDocuments(query);
    res.json({
      success: true,
      body: tasks,
      totalTasks: { all, filtered },
      message: "tasks fetch successfully",
      code: 200,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      body: null,
      message: e.message,
      code: 500,
    });
  }
});

router.post("/", async (req, res) => {
  if (req.body.title && req.body.completed !== undefined) {
    const task = new Task({
      title: req.body.title,
      completed: req.body.completed,
    });
    try {
      task.save();
      res.status(201).json({
        success: true,
        body: task,
        message: "New Task Created Successfully!",
        code: 201,
      });
    } catch (e) {
      res.json({
        success: false,
        body: null,
        message: e.message,
        code: 500,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      body: null,
      message: "Please Enter title and Completed Status!",
      code: 404,
    });
  }
});

router.put("/id", async (req, res) => {
  if (req.body.title && req.body.completed !== undefined) {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          completed: req.body.completed,
        },
        { new: true }
      );

      if (task) {
        res.status(201).json({
          success: true,
          body: task,
          message: "New Task Created Successfully!",
          code: 201,
        });
      } else {
        res.status(404).json({
          success: true,
          body: task,
          message: "Task Not Founded!",
          code: 404,
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        body: null,
        message: e.message,
        code: 500,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      body: null,
      message: "Please Enter new title or Completed Status!",
      code: 404,
    });
  }
});

router.delete("/:id", async (req, res) => {
  if (req.params.id) {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (task) {
        res.json({
          success: true,
          body: null,
          message: "Task Deleted Successfully!",
          code: 200,
        });
      } else {
        res.status(404).json({
          success: false,
          body: null,
          message: "Not Found",
          code: 404,
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        body: null,
        message: e.message,
        code: 500,
      });
    }
  }
});

export default router;
