import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};


// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check required fields
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required",
        statusCode: 400,
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
        statusCode: 400,
      });
    }

    // Check if mobile number already exists
    const existingMobile = await User.findOne({ mobile });

    if (existingMobile) {
      return res.status(400).json({
        message: "Mobile number already exists",
        statusCode: 400,
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      mobile,
      password,
    });

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      statusCode: 201,
      user: {
        id: user._id,
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

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        statusCode: 400,
      });
    }

    // Find user by email
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        statusCode: 401,
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        statusCode: 401,
      });
    }

    const token = generateToken(user._id, user.role);
        res.status(200).json({
          message: "Login successful",
          statusCode: 200,
          token,
          user: {
            id: user._id,
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

// GET CURRENT LOGGED-IN USER
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Current user fetched successfully",
      statusCode: 200,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};