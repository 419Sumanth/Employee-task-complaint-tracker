import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Admin details
    const adminData = {
      name: "Pavan",
      email: "pavan@example.com",
      mobile: "9336673455",
      password: "pavan123",
      role: "admin",
    };

    // Check if admin email already exists
    const existingUser = await User.findOne({
      $or: [
        { email: adminData.email },
        { mobile: adminData.mobile },
      ],
    });

    if (existingUser) {
      console.log("Admin with this email or mobile already exists");
      process.exit(0);
    }

    // Create admin
    const admin = await User.create(adminData);

    console.log("Admin created successfully");
    console.log({
      name: admin.name,
      email: admin.email,
      mobile: admin.mobile,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();

// email: "admin@example.com",
// password: "admin123",

// email: "pavan@example.com",
// password: "pavan123",