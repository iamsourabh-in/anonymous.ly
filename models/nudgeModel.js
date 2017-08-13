var mongoose = require('mongoose');
var nudgeSchema = require('../schemas/nudgeSchema')

var Nudge = mongoose.model('nudges', nudgeSchema);
module.exports = Nudge;
