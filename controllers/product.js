const db = require("../models");
const express = require("express");
const router = express.Router();
const Product = db.products;

module.exports = productsEndpoints = () => {
  router.post("/addProduct", async (req, res) => {
    const {newProduct} = req.body;

    const product = await Product.create(newProduct);

    res.status(200).json(product);
  });

  router.get("/getAll", async (req, res) => {
    let products = await Product.findAll({});
    res.status(200).json(products);
  });

  router.get("/findOne/:id", async (req, res) => {
    const id = req.params.id;
    let product = await Product.findOne({where: {id}});
    res.status(200).json(product);
  });

  router.put("/updateOne/:id", async (req, res) => {
    const id = req.params.id;
    await Product.update(req.body, {
      where: {id},
      returning: true,
    });
    const updatedProduct = await Product.findOne({where: {id}});
    res.status(200).json(updatedProduct);
  });

  router.delete("/deleteOne/:id", async (req, res) => {
    const id = req.params.id;
    await Product.destroy({where: {id}});
    res.status(200).json({msg: "Item deleted", id});
  });

  router.get("/getAllPublished", async (req, res) => {
    let products = await Product.findAll({where: {published: true}});
    res.status(200).json(products);
  });

  return router;
};
