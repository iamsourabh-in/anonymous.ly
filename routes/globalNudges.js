var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var api = require('express-api-helper');

var Nudge = require('../models/globalNudgeModel');

const privateNudgeExtract = "_id msg imageIt senderID senderMeta receiver receiverMeta created reactions comments";


/* GET  nudges/all */
router.get('/all', function (req, res, next) {

    // Check if Request is valid..
    if (req.query != null && req.query != {}) {

        // Finding Nudges for User
        var query = Nudge.find();

        query.select(privateNudgeExtract);

        query.exec(function (err, data) {
            if (err) api.serverError(req, res, err);
            api.ok(req, res, data)
        });
    }
    else {
        api.invalid(req, res, 'invalid Request')
    }

});


/* GET nudges/one */
router.get('/one', function (req, res, next) {

    // Check if Request is valid..
    if (req.query != null && req.query != {}) {

        // Finding Nudges  by id
        Nudge.findOne({ _id: req.query.NudgeId }, function (err, data) {
            if (err) api.serverError(req, res, err);
            if (data) {
                // Revealed then show user DEtails
                if (data.revealed == true) {
                    console.log('data.revealed');
                    // Finding Nudges for User
                    var query = Nudge.findOne({ _id: req.query.NudgeId });
                    query.exec(function (err, nudges) {
                        if (err) api.serverError(req, res, err);
                        api.ok(req, res, nudges);
                    });
                }
                else {
                    console.log('data not revealed');
                    var query = Nudge.findOne({ _id: req.query.NudgeId }, privateNudgeExtract);
                    query.exec(function (err, nudges) {
                        if (err) api.serverError(req, res, err);
                        api.ok(req, res, nudges);
                    });

                    // api.ok(req, res, data)
                }

            }
            else {
                api.notFound(req, res, err);
            }

        });
    }
    else {
        api.invalid(req, res, 'invalid Request')
    }

});


/* POST  nudges/one */
router.post('/reveal', function (req, res, next) {

    // Check if Request is valid..
    if (req.body != null && req.body != {}) {
        Nudge.findOne({ _id: req.body.nudgeId }, function (err, data) {
            if (err) api.serverError(req, res, err)
            if (data != null) {
                if (data.senderID.equals(req.body.userId)) {
                    Nudge.findOne({ _id: req.body.nudgeId }, function (err, nudge) {
                        if (err) api.serverError(req, res, err);
                        nudge.revealed = true;
                        nudge.save();
                        api.ok(req, res, 'True');
                    });
                } else {
                    api.forbidden(req, res, 'You are not authorized to act on it');
                }
            }
        });
    }
    else {
        api.invalid(req, res, 'invalid Request');
    }

});


/* POST  nudges/hide */
router.post('/hide', function (req, res, next) {

    // Check if Request is valid..
    if (req.body != null && req.body != {}) {
        Nudge.findOne({ _id: req.body.nudgeId }, function (err, data) {
            if (err) api.serverError(req, res, err)
            if (data != null) {
                if (req.body.userId == data.senderID) {
                    Nudge.findOne({ _id: req.body.nudgeId }, function (err, nudge) {
                        if (err) api.serverError(req, res, err);
                        nudge.revealed = false;
                        nudge.save();
                        api.ok(req, res, 'True');
                    });
                } else {
                    api.forbidden(req, res, 'You are not authorized to act on it');
                }
            } else {
                api.notFound(req, res, 'data not found');
            }

        });
    }
    else {
        api.invalid(req, res, 'invalid Request');
    }

});


/* POST  nudges/react */
router.post('/react', function (req, res, next) {

    // Check if Request is valid..
    if (req.body != null && req.body != {}) {

        var reaction = req.body.reaction;

        // Find Nudge
        Nudge.findOne({ _id: req.body.nudgeId }, function (err, data) {

            // Return if Error.. !!
            if (err) api.serverError(req, res, err)
            if (data != null) {

                // Update Nudge Reaction
                Nudge.findOne({ _id: req.body.nudgeId }, function (err, nudge) {
                    if (err) api.serverError(req, res, err);

                    // Toggle Reaction Logic
                    var index = nudge.reactions.indexOf(reaction)

                    if (index > -1) {
                        nudge.reactions.splice(index, 1);
                        nudge.save();
                        api.ok(req, res, 'True');
                    }
                    else {
                        nudge.reactions.push(reaction);
                        nudge.save();
                        api.ok(req, res, 'True');
                    }
                });

            } else {
                api.notFound(req, res, 'data not found');
            }

        });
    }
    else {
        api.invalid(req, res, 'invalid Request');
    }

});


/* POST  nudges/Requests */
router.post('/request', function (req, res, next) {

    // Check if Request is valid..
    if (req.body != null && req.body != {}) {

        var request = req.body.request;

        // Find Nudge
        Nudge.findOne({ _id: req.body.nudgeId }, function (err, data) {

            // Return if Error.. !!
            if (err) api.serverError(req, res, err)
            if (data != null) {

                // Update Nudge Requests
                Nudge.findOne({ _id: req.body.nudgeId }, function (err, nudge) {
                    if (err) api.serverError(req, res, err);

                    nudge.requests.push(request);
                    nudge.save();
                    api.ok(req, res, 'True');

                });

            } else {
                api.notFound(req, res, 'data not found');
            }

        });
    }
    else {
        api.invalid(req, res, 'invalid Request');
    }

});



module.exports = router;
