var mongoose = require('mongoose');
var globalNudgeSchema = require('../schemas/globalNudgeSchema')

var GlobalNudge = mongoose.model('global_nudges', globalNudgeSchema);
module.exports = GlobalNudge;
