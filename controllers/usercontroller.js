const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");

// Get all users info
const getusercontroller = async (req, res) => {
  try {
    const user = await usermodel.find();
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get user API",
      err,
    });
  }
};

// Update user profile
const updateusercontroller = async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update user fields
    const { username, address, phone, usertype } = req.body;

    if (username) {
      user.username = username;
    }
    if (address) {
      user.address = address;
    }
    if (phone) {
      user.phone = phone;
    }
    if (usertype) {
      user.usertype = usertype;
    }

    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
      err,
    });
  }
};
//rest password api
const restpasswordcontroller = async (req, res) => {
  try {
    const { email, newpassword, answer } = req.body;
    if (!email || !newpassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const user = await usermodel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found",
      });
    }
    var salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedpassword;
    await user.save();
    res.status(200).send({
      message: "password updated successsfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in reset password  API",
      err,
    });
  }
};
//password update api
const updatepasswordcontroller = async (req, res) => {
  try {
    const user = await usermodel.findById(req.body.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Get data from user
    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return res.status(400).send({
        success: false,
        message: "Please enter all details",
      });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in updating password",
      error: err,
    });
  }
};
//delete user api
const deleteprofilecontroller = async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    await usermodel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in deleting user",
      error: err.message,
    });
  }
};

module.exports = {
  getusercontroller,
  updateusercontroller,
  restpasswordcontroller,
  updatepasswordcontroller,
  deleteprofilecontroller,
};
