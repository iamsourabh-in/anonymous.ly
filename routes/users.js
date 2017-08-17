var express = require('express');
var router = express.Router();
var Users = require('../models/userModel');
var api = require('express-api-helper');

/* GET users listing. */
router.get('/:userId', function (req, res, next) {
  var userId = req.params.userId == null ? "" : req.params.userId
  if (userId != "") {
    Users.findOne({ _id: userId }, function (err, user) {
      if (err) api.serverError(req, res, err)
      api.ok(req, res, user)
    });
  }
});


/* GET users listing. */
router.get('/all', function (req, res, next) {
  Users.findOne({}, function (err, user) {
    if (err) api.serverError(req, res, err);
    api.ok(req, res, user);
  });
});

module.exports = router;
