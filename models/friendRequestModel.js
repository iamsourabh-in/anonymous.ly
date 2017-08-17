var mongoose = require('mongoose');
var globalNudgeSchema = require('../schemas/friendRequestSchema')

var GlobalNudge = mongoose.model('friend_requests', globalNudgeSchema);
module.exports = GlobalNudge;
