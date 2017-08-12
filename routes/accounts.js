var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var api = require('express-api-helper');

var User = require('../models/userModel')

/* POST accounts/Register */
router.post('/register', function (req, res, next) {


  // Check if Request is valid
  if (req.body != null && req.body != {}) {

    // Create new user against schema
    var newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
    });

    // Save new User
    newUser.save(function (err, data) {
      if (err) {
        api.serverError(req, res, err);
      } else {
        api.ok(req, res, data.toJSON());
      }
    });

  }
  else {

  }

});

module.exports = router;
