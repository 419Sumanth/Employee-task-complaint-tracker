import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  assignTask,
  updateTaskStatus,
  addComment,
  getDashboardData,
} from "../controllers/taskController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Dashboard Data
router.get(
  "/dashboard",
  authMiddleware,
  getDashboardData
);

// Create Task
router.post("/", authMiddleware, createTask);

// Get Tasks
router.get("/", authMiddleware, getTasks);

// Assign Task - Admin only
router.put(
  "/:id/assign",
  authMiddleware,
  authorizeRoles("admin"),
  assignTask
);

// Update Task Status - Admin and Staff only
router.put(
  "/:id/status",
  authMiddleware,
  authorizeRoles("admin", "staff"),
  updateTaskStatus
);

// Add Comment / Update
router.post(
  "/:id/comments",
  authMiddleware,
  addComment
);

// Get Single Task
router.get("/:id", authMiddleware, getTaskById);

export default router;