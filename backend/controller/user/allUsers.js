const userModel = require("../../models/userModel");

async function allUsers(req, res) {
   try {
      const allUsers = await userModel.find();
      res.json({
         message: "all users",
         data: allUsers, 
         success: true, 
         error: false
      })
   } catch(err) {
      res.status(400).json({
         message: err?.message || err, 
         error: true, 
         success: false
      })
   }
}

module.exports = allUsers;