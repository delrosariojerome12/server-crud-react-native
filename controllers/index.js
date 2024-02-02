const express = require("express");
const router = express.Router();
//endpoints
const productEndpoints = require("./product");
const authEndpoints = require("./auth");

module.exports = initEndpoints = (app) => {
  router.use("/auth", authEndpoints());
  router.use("/products", productEndpoints());

  app.use("/api", router);
};
