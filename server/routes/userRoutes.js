import express from "express";
import { getStaffMembers, createUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Get all staff members - Admin only
router.get(
  "/staff",
  authMiddleware,
  authorizeRoles("admin"),
  getStaffMembers
);

// Create employee / staff - Admin only
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createUser
);

export default router;