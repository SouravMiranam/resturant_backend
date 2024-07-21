const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getresturantbyidcontroller,
  deleteresturantcontroller,
} = require("../controllers/resturantcontroller");

const router = express.Router();
//routes
//create resurant ||post
router.post("/create", authmiddleware, createRestaurantController);
//get method
router.get("/getall", getAllRestaurantController);
//get resturant by id
router.get("/get/:id", getresturantbyidcontroller);
//delete resturant
router.delete("/delete/:id", authmiddleware, deleteresturantcontroller);
module.exports = router;
