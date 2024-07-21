const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
const registercontroller = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all details",
      });
    }

    const existing = await usermodel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    //hasing of password
    var salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await usermodel.create({
      username,
      email,
      password: hashedpassword,
      address,
      phone,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "Successfully created",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in register API",
    });
  }
};

// login
const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }
    //checks user
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found OR wrong password",
      });
    }
    //checks user password
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(500).send({
        message: "invalid credential",
      });
    }
    //token creating
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      err,
    });
  }
};

module.exports = { registercontroller, logincontroller };
