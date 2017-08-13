var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var globalnudgeSchema = new Schema({
    privatenudgeId: ObjectId,
    msg: String,
    imageIt: String,
    senderID: ObjectId,
    senderMeta: {
        userName: String,
        image: String
    },
    receiver: ObjectId,
    receiverMeta: {
        userName: String,
        image: String
    },
    created: Date,
    reactions: [
        {
            reaction: String,
            userId: ObjectId,
            userName: String,
            image: String
        }
    ],
    comments: [
        {
            comment: String,
            userId: ObjectId,
            userName: String,
            image: String
        }
    ]
});

module.exports = globalnudgeSchema;

var sample = {
    _id: "4c4382vitywewasdvy4wjei8r",
    msg: "You lookin good Today, Red shirt Aahhaa !!",
    imageIt: "https://cdn1.lockerdomecdn.com/uploads/cc3713a18f2a40f151c5ec4b68164e117f89be852f1b7fd6ae6933cc0851e135_large",
    senderID: "598fc91a533f7b1ca84b0660",
    senderMeta: {
        userName: "Sourabh",
        image: "https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png"
    },
    receiver: "598fc927533f7b1ca84b0661",
    receiverMeta: {
        userName: "Sourabh",
        image: "https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png"
    },
    created: "01/01/17 23:23:23",
    reactions: [
        {
            reaction: "Like",
            userId: "598fc91a533f7b1ca84b0660",
            userName: "Sourabh",
            image: "https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png"
        },
        {
            reaction: "WoW",
            userId: "598fc91a533f7b1ca84b0660",
            userName: "Sourabh",
            image: "https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png"
        }
    ],
    comments: [
        {
            comment: "This is Funny",
            userId: "598fc91a533f7b1ca84b0660",
            userName: "Sourabh",
            image: "https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png"
        }
    ]
}