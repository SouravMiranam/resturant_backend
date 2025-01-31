const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "please provide token",
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in auth api",
      err,
    });
  }
};
