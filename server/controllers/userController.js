import User from "../models/User.js";

// GET ALL STAFF MEMBERS
export const getStaffMembers = async (req, res) => {
  try {
    const staffMembers = await User.find({ role: "staff" })
      .select("name email mobile role");

    res.status(200).json({
      message: "Staff members fetched successfully",
      statusCode: 200,
      count: staffMembers.length,
      staff: staffMembers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

// CREATE EMPLOYEE / STAFF - ADMIN ONLY
export const createUser = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        statusCode: 400,
      });
    }

    // Only employee and staff can be created
    if (!["employee", "staff"].includes(role)) {
      return res.status(400).json({
        message: "Role must be employee or staff",
        statusCode: 400,
      });
    }

    // Check duplicate email
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists",
        statusCode: 409,
      });
    }

    // Check duplicate mobile
    const existingMobile = await User.findOne({ mobile });

    if (existingMobile) {
      return res.status(409).json({
        message: "Mobile number already exists",
        statusCode: 409,
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      statusCode: 201,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};