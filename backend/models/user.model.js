const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    accessLevel: { type: String }
}, { collection: 'users' });

userSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('password')) {
        if (user.accessLevel != 'admin' || user.accessLevel != 'user') {
            user.accessLevel = 'user';
        }
        
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(error, hash) {
                if (error) {
                    return next(error);
                }
                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePasswords = function(password, nx) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        nx(err, isMatch);
    });
};

mongoose.model('user', userSchema);