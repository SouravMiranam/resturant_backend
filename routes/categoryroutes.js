const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
  createcatcontroller,
  getallcatcontroller,
  updatecatcontroller,
  deletecatcontroller,
} = require("../controllers/categorycontroller");

const router = express.Router();
//routes
//create cat
router.post("/create", authmiddleware, createcatcontroller);
//get all cat
router.get("/getall", getallcatcontroller);
//update cat
router.put("/update/:id", authmiddleware, updatecatcontroller);
//delete cat
router.delete("/deletecat/:id", authmiddleware, deletecatcontroller);
module.exports = router;
