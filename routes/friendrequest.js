var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var api = require('express-api-helper');
var Friendrequests = require('../models/friendRequestModel');
var Users = require('../models/userModel');


/* GET users listing. */
router.post('/sendrequest', function (req, res, next) {
    var userId = req.body.userId == null ? "" : req.body.userId;
    var requestToUserId = req.body.requestToUserId == null ? "" : req.body.requestToUserId;

    /// Return if params missing
    if (userId == '' || requestToUserId == '')
        api.badRequest(req, res, 'Invalid Request');

    Friendrequests.find({
        $or: [
            { $or: [{ senderId: userId, receiverId: requestToUserId }] },
            { $or: [{ senderId: requestToUserId, receiverId: userId }] }
        ]
    }, function (err_frequest, frequest) {
        if (err_frequest)
            api.serverError(req, res, err_frequest);
        if (frequest.length)
            api.ok(req, res, 'Already Requested');
        else {
            console.log(frequest.length);
            // Get Requested User
            Users.findOne({ _id: userId }, function (err, rq_user) {
                if (err) api.serverError(req, res, err)

                // Get Requested TO User
                Users.findOne({ _id: requestToUserId }, function (err, rt_user) {
                    if (err) api.serverError(req, res, err)

                    var request = new Friendrequests({
                        senderId: rq_user._id,
                        senderMeta: {
                            userName: rq_user.userName,
                            image: rq_user.image
                        },
                        receiverId: rt_user._id,
                        receiverMeta: {
                            userName: rt_user.userName,
                            image: rt_user.image
                        },
                        created: new Date(),
                        seen: false,
                        updated: new Date(),
                        accepted: false
                    });
                    request.save(function (err_save, saved_data) {
                        api.ok(req, res, saved_data)
                    });

                });

            });

        }
    });
});


/* GET users listing. */
router.get('/recievedrequests', function (req, res, next) {
    var userId = req.query.userId == null ? "" : req.query.userId;

    /// Return if params missing
    if (userId == '')
        api.badRequest(req, res, 'Invalid Request')

    Friendrequests.find({ senderId: userId }, function (err_frequest, frequest) {
        if (err_frequest)
            api.serverError(req, res, err_frequest);
        else {
            api.ok(req, res, frequest);
        }
    });
});

module.exports = router;
