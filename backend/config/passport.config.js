const mongoose = require('mongoose');
require('../models/user.model');
const User = mongoose.model('user');
const errorResponse = require('../utils/error.handler');
const LocalStrategy = require('passport-local').Strategy;

module.exports.initPassport = function(passport) {
    passport.use('local', new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({ email: email }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, errorResponse('No user with this email!'));
            
            user.comparePasswords(password, function (error, isMatch) {
                if (error) return done(error);
                if (!isMatch)return done(null, false, errorResponse('Incorrect password'));
                return done(null, user);
            });
        });
    }));

    passport.serializeUser(function (user, done) {
        if (!user) return done('There is no user to login!', null);
        return done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        if (!user) return done("There is no user to logout!", null);
        return done(null, user);
    });
}