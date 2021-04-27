const passport = require('passport');

const errorResponse = require('../utils/error.handler');
const successResponse = require('../utils/success.handler');

const mongoose = require('mongoose');
const User = mongoose.model('user');

const createModelObj = require('../utils/create-model-obj');
const reqContains = require('../utils/req-contains');

module.exports.addUser = function(req, res, next) {
    if (reqContains(req, ['firstname', 'lastname', 'email', 'password', 'passwordAgain', 'accessLevel'])) {
        if (req.body.password !== req.body.passwordAgain) return res.status(400).send(errorResponse('The passwords are not the same'));
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) return res.status(500).send(errorResponse(err));
            if (user) return res.status(400).send(errorResponse('This email already exists!'));
            
            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                accessLevel: req.body.accessLevel
            });

            newUser.save((error) => {
                if(error) return res.status(500).send(errorResponse(error));
                User.findOne({ email: req.body.email }, (erro, usero) => {
                    if (erro) return res.status(500).send(errorResponse(err));
                    if (!usero) return res.status(400).send(errorResponse('User not found'));
                    return res.status(200).send(successResponse('User added!', { user: usero }));
                });
            });
        });
    } else {
        return res.status(400).send(errorResponse('Some of the fields are missing!'));
    }
}

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

module.exports.updateUser = function(req, res, next) {
    if (req.body._id) {
        let props = [];
        Object.keys(req.body).forEach(key => {
            props.push(key);
        });

        if (props.length > 1) {
            let obj = createModelObj(req, props);
            delete obj._id;
            User.findOne({ _id: mongoose.Types.ObjectId(req.body._id) }, (err, user) => {
                if (err) return res.status(500).send(errorResponse(err));
                if (!user) return res.status(404).send(errorResponse('User not found!'));
    
                User.updateOne({ _id: mongoose.Types.ObjectId(req.body._id) }, obj, null, (erro, ress) => {
                    if (err) return res.status(500).send(errorResponse(erro));
                    return res.status(200).send(successResponse('User updated!', {}));
                });
            });
        } else {
            return res.status(400).send(errorResponse('No update data provided!'));
        }
    } else {
        return res.status(400).send(errorResponse('ID is missing!'));
    }
}