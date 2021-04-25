const passport = require('passport');

const errorResponse = require('../utils/error.handler');
const successResponse = require('../utils/success.handler');

const mongoose = require('mongoose');
const User = mongoose.model('user');

const reqContains = require('../utils/req-contains');

module.exports.getAll = function(req, res, next) {
    User.find((error, users) => {
        if (error) return res.status(500).send(errorResponse(error));
        return res.status(200).send(successResponse('', { users: users }));
    });
}

module.exports.getById = function(req, res, next) {
    if (req.query.id) {
        User.findOne({ _id: req.query.id }, (error, user) => {
            if(!user) return res.status(404).send(errorResponse('No user found!'));
            if(error) return res.status(500).send(errorResponse(error));
            return res.status(200).send(successResponse('', { user: user }));
        });
    } else {
        return res.status(400).send(errorResponse('ID is missing!'));
    }
}

module.exports.updateAccessLevel = function(req, res, next) {
    if (req.body._id && req.body.accessLevel) {
        User.findOneAndUpdate({ _id: req.body._id }, { accessLevel: req.body.accessLevel }, null, (error, user) => {
            if (error) return res.status(500).send(errorResponse(error));
            if(!user) return res.status(404).send(errorResponse('No user found!'));
            return res.status(200).send(successResponse('User access level updated', { status: req.body.status }));
        });
    } else {
        return res.status(400).send(errorResponse('Some fields are missing!'));
    }
}