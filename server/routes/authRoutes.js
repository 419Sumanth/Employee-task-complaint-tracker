import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Authenticated user",
    user: req.user,
  });
});

// Get Current User
router.get("/me", authMiddleware, getCurrentUser);

router.get(
  "/admin-test",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
    });
  }
);

export default router;