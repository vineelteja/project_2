var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Restaurant = require("../models/Restaurant.js");

/* GET ALL RestaurantS */
router.get("/get-list", function (req, res, next) {
  Restaurant.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Restaurant BY ID */
router.get("/get/:id", function (req, res, next) {
  console.log("hey");
  Restaurant.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Restaurant */
router.post("/add-data", function (req, res, next) {
  Restaurant.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Restaurant */
router.put("/update/:id", function (req, res, next) {
  Restaurant.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Restaurant */
router.delete("/delete/:id", function (req, res, next) {
  Restaurant.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
