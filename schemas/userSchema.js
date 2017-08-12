var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
    userName: String,
    emailId: String,
    mobileNo: String,
    password: String,
    registered: String,
    image: String,
    blockedUsers: [],

});

module.exports = userSchema;