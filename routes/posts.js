var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var api = require('express-api-helper');

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


module.exports = router;
