
var bcrypt = require("bcryptjs");
 const address_Model = require("../../models/address_Model")
 const userModel = require("../../models/userModel")

async function userSignupController(req, res) {

  try {
    const { firstName, company,  lastName, address1, address2, post_code, country, region, city } = req.body;


    const user = await userModel.findById(req.userId);
    console.log("user: ", user);
    
    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const payload = {
      ...(firstName && { firstName: firstName }),
      ...(lastName && { lastName: lastName }),
      ...(address1) && {address1: address1},
      ...(address2) && {address2: address2},
      ...(post_code) && {post_code: post_code},
      ...(country) && {country: country},
      ...(city) && {city: city},   
      ...(company) && {company: company},   
      ...(region) && {region: region},   
    };

    const updatedUser = await address_Model.findByIdAndUpdate(req.userId, payload, { new: true });

    // Log the updated user for debugging
    console.log("User updated:", updatedUser);

    /*
    const userModel = require("../../models/userModel");



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

  const userData = new address_Model(payload);
    const saveUser = await userData.save();
}

module.exports = updateUser;

    */

    if (!firstName) {
      throw new Error("Please provide first name.");
    }

    if (!lastName) {
      throw new Error("Please provide last name.");
    }


    // const payload2 = {
    //   ...req.body,
    // };

    const userData = new address_Model(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User address created successfully!",
    });
  } catch (err) {
    res.json({
      message: err?.message || err || "An error occurred while updating the user.",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignupController;