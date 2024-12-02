const userModel = require("../models/userModel");
const uploadProductPermission = async (userId) => {
  const user = await userModel.findById(userId);

  if (!user.role !== "ADMIN" || !user.role !== "SELLER" ) {
    return false;
  }
  return true;
};

module.exports = uploadProductPermission;
