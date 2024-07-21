const authmiddleware = require("../middlewares/authmiddleware");
const foodmodel = require("../models/foodmodel");
const ordermodel = require("../models/ordermodel");
const resturant = require("../models/resturant");
//craete food controller
const createfoodcontroller = async (req, res) => {
  try {
    const {
      title,
      discription,
      price,
      imageurl,
      foodtags,
      category,
      code,
      isavilable,
      resturant,
      rating,
      ratingcount,
    } = req.body;
    if (!title || !discription || !price || !resturant) {
      return res.status(400).send({
        success: false,
        message: "enter data in all fields",
        error: error.message,
      });
    }
    const newfood = new foodmodel({
      title,
      discription,
      price,
      imageurl,
      foodtags,
      category,
      code,
      isavilable,
      resturant,
      rating,
      ratingcount,
    });
    await newfood.save();
    res.status(201).send({
      success: true,
      message: "create food item successfully",
      newfood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error: error.message,
    });
  }
};
//get all foods controller
const getallfoodscontroller = async (req, res) => {
  try {
    const foods = await foodmodel.find({});
    if (!foods) {
      return res.status(500).send({
        success: false,
        message: "no food present",
      });
    }
    res.status(200).send({
      success: true,
      foodcount: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all food api",
      error: error.message,
    });
  }
};
//get single food by id
const getsinglefoodcontroller = async (req, res) => {
  try {
    const foodid = req.params.id;
    if (!foodid) {
      return res.status(500).send({
        success: false,
        message: "enter the correct food id",
        error: error.message,
      });
    }
    const food = await foodmodel.findById(foodid);
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "no food present by the id",
        error: error.message,
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single food api",
      error: error.message,
    });
  }
};
//get foods by resturant id
const getfoodbyresturantcontroller = async (req, res) => {
  try {
    const resturantid = req.params.id;
    if (!resturantid) {
      return res.status(400).send({
        success: false,
        message: "Please enter a valid restaurant ID",
      });
    }

    const food = await foodmodel.find({ resturant: resturantid });
    if (!food || food.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No food present for the given restaurant ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Foods retrieved successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving food by restaurant ID",
      error: error.message,
    });
  }
};
//updte food by id
const updatefoodcontroller = async (req, res) => {
  try {
    const foodid = req.params.id;
    if (!foodid) {
      return res.status(500).send({
        success: false,
        message: "enter correct food id",
      });
    }
    const food = await foodmodel.findById(foodid);
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "food not present",
      });
    }
    const {
      title,
      discription,
      price,
      imageurl,
      foodtags,
      category,
      code,
      isavilable,
      resturant,
      rating,
      ratingcount,
    } = req.body;
    const updatedfood = await foodmodel.findByIdAndUpdate(
      foodid,
      {
        title,
        discription,
        price,
        imageurl,
        foodtags,
        category,
        code,
        isavilable,
        resturant,
        rating,
        ratingcount,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "food updated",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving food by restaurant ID",
      error: error.message,
    });
  }
};
//delete food by id
const deletefoodcontroller = async (req, res) => {
  try {
    foodid = req.params.id;
    if (!foodid) {
      return res.status(500).send({
        success: false,
        message: "enter id",
      });
    }
    const deletedfood = await foodmodel.findByIdAndDelete(foodid);
    res.status(200).send({
      success: true,
      message: "successfully deleted food",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving food by restaurant ID",
      error: error.message,
    });
  }
};
//place  order
const placeordercontroller = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "add items in cart",
      });
    }
    let total = 0;
    //calculation
    cart.map((i) => {
      total += i.price;
    });
    const neworder = new ordermodel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await neworder.save();
    res.status(201).send({
      success: true,
      message: "order placed successfully",
      neworder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order api",
      error: error.message,
    });
  }
};
//changes order status by admin
const orderstauscontroller = async (req, res) => {
  try {
    const orderid = req.params.id;
    const { status } = req.body;
    const order = await ordermodel.findByIdAndUpdate(
      orderid,
      { status: status },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "order id status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in change order status api",
      error: error.message,
    });
  }
};
module.exports = {
  createfoodcontroller,
  getallfoodscontroller,
  getsinglefoodcontroller,
  getfoodbyresturantcontroller,
  updatefoodcontroller,
  deletefoodcontroller,
  placeordercontroller,
  orderstauscontroller,
};
