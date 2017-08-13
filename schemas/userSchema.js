var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
    userName: String,
    emailId: String,
    mobileNo: String,
    password: String,
    registered: Date,
    image: String,
    friends: [],
    blockedUsers: [],

});

// userSchema.pre('save', function(next){
//     var user = this;
//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
//         if(err) return next(err);

//         bcrypt.hash(user.password, salt, function(err, hash){
//             if(err) return next(err);

//             user.password = hash;
//             next();
//         });
//     });
// });


module.exports = userSchema;