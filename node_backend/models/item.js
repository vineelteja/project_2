var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", ItemSchema);
