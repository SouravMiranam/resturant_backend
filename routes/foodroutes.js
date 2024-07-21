const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
  createfoodcontroller,
  getallfoodscontroller,
  getsinglefoodcontroller,
  getfoodbyresturantcontroller,
  updatefoodcontroller,
  deletefoodcontroller,
  placeordercontroller,
  orderstauscontroller,
} = require("../controllers/foodcontroller");
const adminmiddleware = require("../middlewares/adminmiddleware");

const router = express.Router();
//routes
//craete food route
router.post("/create", authmiddleware, createfoodcontroller);
//get all foods route
router.get("/getall", getallfoodscontroller);
//get food by id
router.get("/get/:id", getsinglefoodcontroller);
//get foods by resturant
router.get("/getbyresturant/:id", getfoodbyresturantcontroller);
//update food route
router.put("/update/:id", authmiddleware, updatefoodcontroller);
//delete food by id
router.delete("/delete/:id", authmiddleware, deletefoodcontroller);

//place order
router.post("/placeorder", authmiddleware, placeordercontroller);

//order status changing by admin
router.post("/orderstatus/:id", adminmiddleware, orderstauscontroller);
module.exports = router;
