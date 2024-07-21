const resturant = require("../models/resturant");
const Restaurant = require("../models/resturant");

// Create restaurant
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imgurl,
      food,
      time,
      pickup,
      deliver,
      isopen,
      logourl,
      rating,
      ratingcount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please provide the necessary title and coordinates.",
      });
    }

    const newRestaurant = new Restaurant({
      title,
      imgurl,
      food,
      time,
      pickup,
      deliver,
      isopen,
      logourl,
      rating,
      ratingcount,
      code,
      coords,
    });

    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "Restaurant created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating restaurant.",
      error: error.message,
    });
  }
};

// Get all restaurants
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found.",
      });
    }
    res.status(200).send({
      success: true,
      totalRestaurants: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all restaurants.",
      error: error.message,
    });
  }
};
//get resturant by id
const getresturantbyidcontroller = async (req, res) => {
  try {
    const resturantid = req.params.id;
    const resturant = await Restaurant.findById(resturantid);
    if (!resturant) {
      res.status(404).send({
        success: false,
        message: "resturant not found",
        error: error.message,
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting restaurant by id.",
      error: error.message,
    });
  }
};
//delete resturant
const deleteresturantcontroller = async (req, res) => {
  try {
    const resturantid = req.params.id;
    if (!resturantid) {
      return res.status(500).send({
        success: false,
        message: "no id found of resturant or enter resturant id",
        error: error.message,
      });
    }
    await Restaurant.findByIdAndDelete(resturantid);
    res.status(200).send({
      success: true,
      message: "deleted resutrant successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleteing restaurant api ",
      error: error.message,
    });
  }
};
module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getresturantbyidcontroller,
  deleteresturantcontroller,
};
