// load up the user model
var User = require("../models/user");
var bcrypt = require("bcrypt");
var express = require("express");
// app/routes.js
module.exports = function (app, passport) {
  app.post("/login", function (req, res, next) {
    passport.authenticate("local-login", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(info.message);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    })(req, res, next);
  });

  app.get("/get/:id", function (req, res, next) {
    console.log("hey");
    User.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  app.get("/get-list", function (req, res, next) {
    User.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  app.put("/update/:id", function (req, res, next) {
    var update = {
      "option.option1": req.body.option1,
      "option.option2": req.body.option2,
      "option.option3": req.body.option3,
      "option.option4": req.body.option4,
      "option.option5": req.body.option5,
    };
    User.findByIdAndUpdate(req.params.id, update, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  app.put("/password/:id", function (req, res, next) {
    var update = {
      "local.password": bcrypt.hashSync(req.body.password, 8),
    };
    User.findByIdAndUpdate(req.params.id, update, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  app.delete("/delete/:id/", function (req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  app.post("/signup", (req, res) => {
    console.log(req.body);
    User.findOne(
      {
        $or: [
          { "local.username": req.body.username },
          { "local.email": req.body.email },
        ],
      },
      function (err, user) {
        if (err) {
          return res.send(err);
        }
        if (user) {
          if (user.local.username == req.body.username) {
            return res.send("This username is already taken.");
          }
          return res.send("This username is already taken.");
        } else {
          var userData = new User();
          var genStr =
            (+new Date()).toString(36).slice(-10) +
            Math.random().toString(36).slice(-10);
          const saltRounds = 10;
          let hash = bcrypt.hashSync(genStr, saltRounds);
          let updateHash = hash
            .replace(/[/]/g, "")
            .replace(/[$]/g, "")
            .replace(/[.]/g, "");
          const link = "http://localhost:8080/verify/" + updateHash;

          userData.local.username = req.body.username;
          userData.local.email = req.body.email;
          userData.local.password = req.body.password;
          userData.local.verifyusername = updateHash;
          userData.local.role = req.body.role ? req.body.role : "admin";

          userData
            .save()
            .then((item) => {
              console.log(item);
              res.status(200).send(" registered in database");
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send("unable to save to database");
            });
        }
      }
    );
  });

  // verify username address
  app.post("/verify", (req, res) => {
    User.findOne(
      { "local.verifyusername": req.body.verifyusername },
      function (err, result) {
        if (err) {
          return res.send(err);
        }
        if (!result) {
          return res.send("Broken link");
        }

        result.local.isVerified = true;
        result.local.verifyusername = undefined;

        result.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send({
              validation: true,
              username: result.local.username,
            });
          }
        });
      }
    );
  });

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get("/user", isLoggedIn, function (req, res) {
    // res.send({
    // 	user: req.user // get the user out of session and pass to template
    // })
    res.json(req.user);
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get("/logout", function (req, res) {
    req.logout();
    res.send({
      logedOut: true,
    });
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.send("/");
}
