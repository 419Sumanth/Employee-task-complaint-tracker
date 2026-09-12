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