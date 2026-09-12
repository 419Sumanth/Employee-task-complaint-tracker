import Task from "../models/Task.js";
import User from "../models/User.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    // Check required fields
    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title, description and category are required",
        statusCode: 400,
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      category,
      priority,
      raisedBy: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      statusCode: 201,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

// GET TASKS
export const getTasks = async (req, res) => {
  try {
    const { status, category, assignedTo, search } = req.query;

    let query = {};

    // Role-based task access
    if (req.user.role === "employee") {
      query.raisedBy = req.user._id;
    } else if (req.user.role === "staff") {
      query.assignedTo = req.user._id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by assignee
    if (assignedTo && req.user.role === "admin") {
      query.assignedTo = assignedTo;
    }

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Get tasks
    const tasks = await Task.find(query)
      .populate("raisedBy", "name email mobile role")
      .populate("assignedTo", "name email mobile role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Tasks fetched successfully",
      statusCode: 200,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

// GET SINGLE TASK
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("raisedBy", "name email mobile role")
      .populate("assignedTo", "name email mobile role")
      .populate("comments.createdBy", "name email role");

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        statusCode: 404,
      });
    }

    // Admin can access any task
    if (req.user.role === "admin") {
      return res.status(200).json({
        message: "Task fetched successfully",
        statusCode: 200,
        task,
      });
    }

    // Employee can access only their own raised tasks
    if (
      req.user.role === "employee" &&
      task.raisedBy._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You do not have permission to view this task",
        statusCode: 403,
      });
    }

    // Staff can access only tasks assigned to them
    if (
      req.user.role === "staff" &&
      (!task.assignedTo ||
        task.assignedTo._id.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({
        message: "You do not have permission to view this task",
        statusCode: 403,
      });
    }

    // Return task
    res.status(200).json({
      message: "Task fetched successfully",
      statusCode: 200,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

// ASSIGN TASK
export const assignTask = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    // Check if staff ID is provided
    if (!assignedTo) {
      return res.status(400).json({
        message: "Staff member is required",
        statusCode: 400,
      });
    }

    // Check if task exists
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        statusCode: 404,
      });
    }

    // Check if assigned user exists
    const staff = await User.findById(assignedTo);

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found",
        statusCode: 404,
      });
    }

    // Ensure assigned user is staff
    if (staff.role !== "staff") {
      return res.status(400).json({
        message: "Task can only be assigned to a staff member",
        statusCode: 400,
      });
    }

    // Assign task
    task.assignedTo = staff._id;

    await task.save();

    res.status(200).json({
      message: "Task assigned successfully",
      statusCode: 200,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

// UPDATE TASK STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Check if status is provided
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        statusCode: 400,
      });
    }

    // Check if task exists
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        statusCode: 404,
      });
    }

    // If staff, check whether task is assigned to them
    if (req.user.role === "staff") {
      if (
        !task.assignedTo ||
        task.assignedTo.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          message: "You can only update tasks assigned to you",
          statusCode: 403,
        });
      }
    }

    // Update status
    task.status = status;

    await task.save();

    res.status(200).json({
      message: "Task status updated successfully",
      statusCode: 200,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { message } = req.body;

    // Check if comment message is provided
    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Comment message is required",
        statusCode: 400,
      });
    }

    // Find task
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        statusCode: 404,
      });
    }

    // Employee can comment only on their own tasks
    if (
      req.user.role === "employee" &&
      task.raisedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You do not have permission to comment on this task",
        statusCode: 403,
      });
    }

    // Staff can comment only on tasks assigned to them
    if (
      req.user.role === "staff" &&
      (!task.assignedTo ||
        task.assignedTo.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({
        message: "You do not have permission to comment on this task",
        statusCode: 403,
      });
    }

    // Add comment
    task.comments.push({
      message: message.trim(),
      createdBy: req.user._id,
    });

    await task.save();

    const newComment = task.comments[task.comments.length - 1];

    res.status(201).json({
      message: "Comment added successfully",
      statusCode: 201,
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

// GET DASHBOARD DATA
export const getDashboardData = async (req, res) => {
  try {
    let matchQuery = {};

    // Role-based dashboard data
    if (req.user.role === "employee") {
      matchQuery.raisedBy = req.user._id;
    } else if (req.user.role === "staff") {
      matchQuery.assignedTo = req.user._id;
    }

    // Get task counts grouped by status
    const statusData = await Task.aggregate([
      {
        $match: matchQuery,
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // Get task counts grouped by category
    const categoryData = await Task.aggregate([
      {
        $match: matchQuery,
      },
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // Default status counts
    const statusCounts = {
      Open: 0,
      "In Progress": 0,
      Resolved: 0,
      Closed: 0,
    };

    // Fill actual counts
    statusData.forEach((item) => {
      statusCounts[item._id] = item.count;
    });

    // Format category data
    const categoryCounts = categoryData.map((item) => ({
      category: item._id,
      count: item.count,
    }));

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      statusCode: 200,
      statusCounts,
      categoryCounts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};