var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var nudgeSchema = new Schema({
    msg: String,
    imageIt: String,
    to: ObjectId,
    created: Date,
    senderID: ObjectId,
    senderMeta: {
        userName: String,
        image: String
    },
    reactions: [String],
    requests: [String],
    removed: Boolean,
    seeking: Boolean,
    revealed: Boolean,
    global: Boolean
});

module.exports = nudgeSchema;

var sample = {
    _id: "4c4382vitywewasdvy4wjei8r",
    msg: "You lookin good Today, Red shirt Aahhaa !!",
    imageIt: "http://hd.wallpaperswide.com/thumbs/apple_simple_blue-t2.jpg",
    senderID: "598fc91a533f7b1ca84b0660",
    senderMeta: {
        userName: "Sourabh",
        image: "https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png"
    },
    to: "598fc927533f7b1ca84b0661",
    created: "01/01/17 23:23:23",
    reactions: [

    ],
    removed: 'Boolean',
    seeking: 'Boolean',
    revealed: 'Boolean',
    global: 'Boolean'
}