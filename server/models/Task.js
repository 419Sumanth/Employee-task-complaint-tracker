import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["IT", "Hardware", "Software", "Facilities", "HR", "Other"],
    },

    priority: {
      type: String,
      required: [true, "Priority is required"],
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },

    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;

// POST   http://localhost:5000/api/auth/register

// POST   http://localhost:5000/api/auth/login

// POST   http://localhost:5000/api/tasks

// GET    http://localhost:5000/api/tasks

// GET    http://localhost:5000/api/tasks/:id

// PUT    http://localhost:5000/api/tasks/:id/assign

// PUT    http://localhost:5000/api/tasks/:id/status

// POST   http://localhost:5000/api/tasks/:id/comments