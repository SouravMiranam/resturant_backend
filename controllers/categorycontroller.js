const authmiddleware = require("../middlewares/authmiddleware");
const categorymodel = require("../models/categorymodel");

//create cat
const createcatcontroller = async (req, res) => {
  try {
    const { title, imageurl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "enter the category ",
        error: error.message,
      });
    }
    const newcategory = new categorymodel({ title, imageurl });
    await newcategory.save();
    res.status(200).send({
      success: true,
      message: "category created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating category api",
      error: error.message,
    });
  }
};
//get all cat
const getallcatcontroller = async (req, res) => {
  try {
    const categories = await categorymodel.find();
    if (!categories) {
      return res.status(500).send({
        success: false,
        message: "no categories present",
        error: error.message,
      });
    }
    res.status(200).send({
      success: true,
      totalcategories: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all category api",
      error: error.message,
    });
  }
};
//update cat
const updatecatcontroller = async (req, res) => {
  try {
    const { id } = req.params; //for id this is the method
    const { title, imageurl } = req.body;
    const updatedcategory = await categorymodel.findByIdAndUpdate(
      id,
      { title, imageurl },
      { new: true }
    );
    if (!updatedcategory) {
      return res.status(404).send({
        success: false,
        message: "no category ",
        error: error.message,
      });
    }
    res.status(200).send({
      success: true,
      message: "category updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update category api",
      error: error.message,
    });
  }
};
//delete cat
const deletecatcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "category not found",
        error: error.message,
      });
    }
    const category = await categorymodel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete category api",
      error: error.message,
    });
  }
};

module.exports = {
  createcatcontroller,
  getallcatcontroller,
  updatecatcontroller,
  deletecatcontroller,
};
