const express = require("express");
const {
  getusercontroller,
  updateusercontroller,
  restpasswordcontroller,
  updatepasswordcontroller,
  deleteprofilecontroller,
} = require("../controllers/usercontroller");
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();
router.get("/getuser", authmiddleware, getusercontroller);
//update profile
router.put("/updateuser/:id", authmiddleware, updateusercontroller);
//resset password
router.post("/resetpassword", authmiddleware, restpasswordcontroller);
//password update
router.post("/updatepassword", authmiddleware, updatepasswordcontroller);
//delete user api
router.delete("/deleteuser/:id", authmiddleware, deleteprofilecontroller);
module.exports = router;
