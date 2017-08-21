var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var api = require('express-api-helper');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = require('../models/userModel')

const saltRounds = 10;
const userExtract = "_id userName emailId mobileNo password";

/* POST accounts/Register */
router.post('/register', function (req, res, next) {

  // Get data from the body for registering User
  var rq_userName = req.body.userName == null ? "" : req.body.userName;
  var rq_mobileNo = req.body.mobileNo == null ? "" : req.body.mobileNo;
  var rq_emailId = req.body.emailId == null ? "" : req.body.emailId;
  var rq_password = req.body.password == null ? "" : req.body.password;
  var rq_image = req.body.image == null ? "" : req.body.image;

  if (rq_userName == "" || rq_emailId == "")
    api.badRequest(req, res, 'Invalid Request');
  // Check if Username or Email exists..
  User.find({ userName: rq_userName }, function (err, data) {
    if (err) api.serverError(req, res, err);

    // Encrypt Data any which
    bcrypt.genSalt(saltRounds, function (err, salt) {
      // Store hash in your password DB. 
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        // If User found (Note : Length to check where find is user not findOne)
        if (data.length) {
          // Return Bad Request
          api.badRequest(req, res, 'Username already Exists');
        }
        else {
          // Create new user against schema
          var newUser = new User({
            userName: rq_userName,
            password: hash,
            mobileNo: rq_mobileNo,
            emailId: rq_emailId,
            image: rq_image,
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



});


/* POST accounts/login */
router.post('/login', function (req, res, next) {

  var rq_emailId = req.body.emailId == null ? "" : req.body.emailId;
  var rq_password = req.body.password == null ? "" : req.body.password;

  console.log(req.body.rq_password);
  // Check if Request is valid
  if (rq_emailId != '') {

    //Check if User exists
    User.find({ emailId: rq_emailId }, function (err, data) {
      if (err) return api.serverError(req, res, err);
      console.log(data);
      // If User found Login
      if (data.length) {

        var user = {
          details: data[0],
          token: ""
        };
        api.ok(req, res, user);
        // // Load hash from your password DB. 
        // bcrypt.compare(rq_password, data.password, function (err, match) {

        //   if (match) {

        //     var token = jwt.sign(data, 'shhhhh');

        //     user.token = token;
        //     api.ok(req, res, user);
        //   }
        //   else {
        //     api.unauthorized(req, res);
        //   }
        // });
      }
      else {
        api.unauthorized(req, res);
      }

    });

  }
  else {
    api.badRequest(req, res, 'asd');
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
