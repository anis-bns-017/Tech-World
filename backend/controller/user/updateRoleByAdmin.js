const userModel = require("../../models/userModel");

async function updateRoleByAdmin(req, res) {
  try {
    const {userId, role } = req.body;

    const user_a = await userModel.findOne({userId});

    // Construct the payload for update
    const payload = {
      role: role
    };

    // Find the user by userId
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Update the user with the new data
    const updatedUser = await userModel.findByIdAndUpdate(user, payload, { new: true });

    // Log the updated user for debugging
    console.log("User updated:", updatedUser);

    res.json({
      data: updatedUser,
      message: "User updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error updating user:", err); // Log the error details
    res.status(500).json({
      message: err.message || "An error occurred while updating the user.",
      error: true,
      success: false,
    });
  }
}

module.exports = updateRoleByAdmin;
