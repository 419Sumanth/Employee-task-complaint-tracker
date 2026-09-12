import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Employee Task & Complaint Tracker API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// employee-task-tracker/
// │
// ├── backend/
// │   │
// │   ├── config/
// │   │   └── db.js
// │   │
// │   ├── controllers/
// │   │   ├── authController.js
// │   │   ├── taskController.js
// │   │   └── dashboardController.js
// │   │
// │   ├── middleware/
// │   │   ├── authMiddleware.js
// │   │   └── errorMiddleware.js
// │   │
// │   ├── models/
// │   │   ├── User.js
// │   │   └── Task.js
// │   │
// │   ├── routes/
// │   │   ├── authRoutes.js
// │   │   ├── taskRoutes.js
// │   │   └── dashboardRoutes.js
// │   │
// │   ├── .env
// │   ├── .gitignore
// │   ├── package.json
// │   └── server.js
// │
// └── frontend/