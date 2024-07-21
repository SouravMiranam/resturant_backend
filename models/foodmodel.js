const mongoose = require("mongoose");
const foodschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageurl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodtags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isavilable: {
      type: Boolean,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resturant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingcount: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("foods", foodschema);
