const mongoose = require("mongoose");
const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
      default: "client",
      required: true,
      enum: ["client", "vendor", "driver", "admin"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw2S8AMCGxzZgzyEzt-MKO__&ust=1721366419332000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPi0w-Hrr4cDFQAAAAAdAAAAABAE",
    },
    answer: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userschema);
