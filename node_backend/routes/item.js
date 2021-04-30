var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Item = require("../models/item.js");

/* GET ALL ItemS */
router.get("/get-list", function (req, res, next) {
  Item.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Item BY ID */
router.get("/get/:id", function (req, res, next) {
  console.log("hey");
  Item.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Item */
router.post("/add-data", function (req, res, next) {
  Item.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Item */
router.put("/update/:id", function (req, res, next) {
  Item.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Item */
router.delete("/delete/:id", function (req, res, next) {
  Item.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
