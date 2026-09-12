import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const createStaff = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Staff details
    const staffData = {
      name: "Sourav",
      email: "sourav@example.com",
      mobile: "9993902348",
      password: "sourav123",
      role: "staff",
    };

    // Check if staff email or mobile already exists
    const existingUser = await User.findOne({
      $or: [
        { email: staffData.email },
        { mobile: staffData.mobile },
      ],
    });

    if (existingUser) {
      console.log("Staff with this email or mobile already exists");
      process.exit(0);
    }

    // Create staff
    const staff = await User.create(staffData);

    console.log("Staff created successfully");
    console.log({
      name: staff.name,
      email: staff.email,
      mobile: staff.mobile,
      role: staff.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("Error creating staff:", error.message);
    process.exit(1);
  }
};

createStaff();

// email: "staff@example.com",
// password: "staff123",
// role:"staff"

// email: "girish@example.com"
// password: "girish123",
// role: "staff"

      // email: "krishna@example.com",
      // password: "krishna123",
      // role: "staff",

      // email: "mohan@example.com",
      // password: "mohan123",
      // role: "staff"

      // email: "sourav@example.com",
      // password: "sourav123",
      // role: "staff",

// email: "akash@example.com",
// password: "akash123",
// role:"employee"

//  email: "avi@example.com",
//  password: "avi123",
//  role:"employee"

      // email: "vishwas@example.com",
      // password: "vishwas123",
      // role: "employee",
    
      // email: "pranav@example.com",
      // password: "pranav123",
      // role: "employee",     
      
      // email: "mahesh@example.com",
      // password: "mahesh123",
      // role: "employee",      