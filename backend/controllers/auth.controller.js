const passport = require('passport');

const errorResponse = require('../utils/error.handler');
const successResponse = require('../utils/success.handler');

const mongoose = require('mongoose');
const User = mongoose.model('user');

const reqContains = require('../utils/req-contains')

module.exports.login = function(req, res, next) {
    if (reqContains(req, ['email', 'password'])) {
        User.findOne({ email: req.body.email }, (err, us) => {
            if (err) return res.status(500).send(errorResponse(err));
            if(!us) {
                return res.status(404).send(errorResponse('No user found!'));
            } else {
                passport.authenticate('local', function(error, user) {
                    if (error) return res.status(500).send(errorResponse(error));
                    req.login(user, function(error) {
                        if (error) return res.status(500).send(errorResponse(error));
                        return res.status(200).send(successResponse('Successful login!', { user: us }));
                    });
                })(req, res);
            }
            
        });
        
    } else {
        return res.status(400).send(errorResponse('Password and email are required!'));
    }
}

module.exports.registrate = function(req, res, next) {
    if (reqContains(req, ['firstname', 'lastname', 'email', 'password', 'passwordAgain'])) {
        if (req.body.password !== req.body.passwordAgain) return res.status(400).send(errorResponse('The passwords are not the same'));
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) return res.status(500).send(errorResponse(err));
            if (user) return res.status(400).send(errorResponse('This email already exists!'));
            
            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            });

            newUser.save((error) => {
                if(error) return res.status(500).send(errorResponse(error));
                return res.status(200).send(successResponse('Successful registration!', {}));
            });
        });
    } else {
        return res.status(400).send(errorResponse('Some of the fields are missing!'));
    }
}

module.exports.logout = function(req, res, next) {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).send(successResponse('Logged out!', {}));
    } else {
        return res.status(403).send(errorResponse('The user was not logged in'));
    }
}