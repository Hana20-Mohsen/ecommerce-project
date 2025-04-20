import path from 'node:path'
import * as dotenv from 'dotenv'
import bootstrap from './src/app.controller.js'
import express from "express"

dotenv.config({path:path.resolve('.env')});
console.log("✅ .env loaded");
console.log("🔍 CONNECTION_STRING:", process.env.CONNECTION_STRING);
console.log("🔍 PORT:", process.env.PORT);
const app=express();
const port =process.env.PORT;
bootstrap(app , express)
console.log("🔍 CONNECTION_STRING from process.env:", process.env.CONNECTION_STRING);
app.listen(port , ()=>{console.log(`listening on ${port}`);
})




// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authJwt = require("./helper/jwt");
// require("dotenv/config");
// app.use(cors());
// app.options("*", cors());
// //middleware
// app.use(express.json());
// app.use(morgan("tiny"));
// app.use("/uploads", express.static(__dirname + "/uploads"));
// app.use(authJwt());
// app.use((err, req, res, next) => {
//   if ((err.name = "UnauthorizedError")) {
//     res.status(401).json({ message: "user not authorized" });
//   }
//   if ((err.name = "validationError")) {
//     res.status(401).json({ message: err });
//   }
//   return res.status(500).json({ message: "server error" });
// });
// //Routes
// const categoriesRoutes = require("./routers/category");
// const productsRoutes = require("./routers/product");
// const usersRoutes = require("./routers/user");
// const ordersRoutes = require("./routers/order");

// const api = process.env.API_URL;

// app.use(`${api}/category`, categoriesRoutes);
// app.use(`${api}/product`, productsRoutes);
// app.use(`${api}/user`, usersRoutes);
// app.use(`${api}/order`, ordersRoutes);

// //Database
// mongoose
//   .connect(process.env.CONNECTION_STRING, {
//     dbName: "eshop",
//   })
//   .then(() => {
//     console.log("Database Connection is ready...");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// //Server
// app.listen(3000, () => {
//   console.log("server is running http://localhost:3000");
// });
