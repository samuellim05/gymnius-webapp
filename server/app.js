const express = require("express");
const createHttpError = require("http-errors");
const cors = require("cors");

//routes
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");


const app = express();
const http = require("http").Server(app);

app.use(express.json()); // to process JSON in request body
app.use(cors());

app.use("/user", userRoute);
app.use("/products", productRoute);


module.exports = { app, http };
