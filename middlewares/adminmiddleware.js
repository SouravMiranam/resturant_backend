//const usermodel = require("../models/usermodel");

// module.exports = async (req, res, next) => {
//   try {
//     const user = await usermodel.findById(req.body);
//     if (user.usertype === "client") {
//       return res.status(401).send({
//         success: false,
//         message: "only admin adccess",
//       });
//     } else {
//       next();
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       success: false,
//       message: "error in admin middleware api",
//       err,
//     });
//   }
// };//not working
//working
const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with your actual secret
    const userId = decodedToken.id; // Assuming the token contains the user ID as 'id'
    console.log(`Decoded User ID from token: ${userId}`);

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    console.log(`User found: ${user}`);

    if (user.usertype === "client") {
      return res.status(403).send({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    next(); // User is not a client, proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error in admin middleware:", err);
    res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error: err.message, // Provide a descriptive error message
    });
  }
};
