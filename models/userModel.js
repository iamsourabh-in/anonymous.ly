var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema')

var User = mongoose.model('users', userSchema);
module.exports = User;
