// app/models/user.js
// load the things we need
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
//const bycrpt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
  option: {
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    option5: String,
  },
  local: {
    password: String,
    email: String,
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    role: String,
    verifyusername: String,
    resetPassword: String,
  },
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

//hashing a password before saving it to the database
userSchema.pre("save", function (next) {
  var user = this.local;
  console.log(user.password); // Check accident password update
  if (user.isModified("password") || this.local.isNew) {
    if (this.local.isModified("password")) {
      console.log("is modifed");
    }
    bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  } else {
    return next();
  }
});

//create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema);
