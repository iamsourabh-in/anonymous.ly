var mongoose = require('mongoose');
var Schema = mongoose.Schema

var postSchema = new Schema({
    userName: String,
    emailId: String,
    mobileNo: String,
    password: String,
    registered: String,
    image: String,
    blockedUsers: [],

});

module.exports = postSchema;