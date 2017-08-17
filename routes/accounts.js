var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var api = require('express-api-helper');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = require('../models/userModel')

const saltRounds = 10;

/* POST accounts/Register */
router.post('/register', function (req, res, next) {

  // Check if Request is valid..
  if (req.body != null && req.body != {}) {

    // Check if Username or Email exists..
    User.find({ userName: req.body.userName }, function (err, data) {
      if (err) api.serverError(req, res, err);

      // Encrypt Data any which
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          // Store hash in your password DB. 

          // If User found (Note : Length to check where find is user not findOne)
          if (data.length) {

            // Return Bad Request
            api.badRequest(req, res, 'Username already Exists');

          }
          else {

            // Create new user against schema
            var newUser = new User({
              userName: req.body.userName,
              password: hash,
              mobileNo: req.body.mobileNo,
              emailId: req.body.emailId,
              image: req.body.image,
              registered: new Date()
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

        });

      });


    });

  }
  else {

  }

});


/* POST accounts/login */
router.post('/login', function (req, res, next) {

  // Check if Request is valid
  if (req.body != null && req.body != {}) {

    //Check if User exists
    User.findOne({ $or: [{ 'userName': req.body.userName }, { 'email': req.body.userName }] }, function (err, data) {
      if (err) return api.serverError(req, res, err);

      // If User found Login
      if (data != null) {

        // Load hash from your password DB. 
        bcrypt.compare(req.body.password, data.password, function (err, match) {
          if (match) {

            var token = jwt.sign(data, 'shhhhh');

            api.ok(req, res, token);
          }
          else {
            api.unauthorized(req, res);
          }
        });
      }
      else {
        api.unauthorized(req, res);
      }

    });

  }
  else {

  }

});


/* POST accounts/ChangePassword */
router.post('/ChangePassword', function (req, res, next) {

  // Check if Request is valid
  if (req.body != null && req.body != {}) {

    //Check if User exists
    User.find({ $or: [{ 'userName': req.body.userName }, { 'email': req.body.userName }] }, function (err, data) {
      if (err) return api.serverError(req, res, err);

      // If User found Login
      if (data.length) {
        // initiate Change Password
      }
      else {
        api.notFound(req, res);
      }

    })

  }
  else {

  }

});

module.exports = router;
