var mongoose = require("mongoose");

var RestaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
