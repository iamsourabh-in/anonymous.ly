var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var friendRequestSchema = new Schema({
    receiverId: ObjectId,
    receiverMeta: {
        userName: String,
        image: String
    },
    senderId: ObjectId,
    senderMeta: {
        userName: String,
        image: String
    },
    created: Date,
    seen: Boolean,
    updated: Date,
    accepted: Boolean
});


module.exports = friendRequestSchema;