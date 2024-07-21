const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require("./config/db");

//dotenv config
dotenv.config();

//db connection
connectdb();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/", require("./routes/testroute"));
app.use("/", require("./routes/authroute"));
app.use("/", require("./routes/userroute"));
app.use("/resturant", require("./routes/resturantroute"));
app.use("/category", require("./routes/categoryroutes"));
app.use("/", require("./routes/foodroutes"));
//server url
app.get("/", (req, res) => {
  return res.status(200).send(`<h1>Welcome to food server APP</h1>`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
