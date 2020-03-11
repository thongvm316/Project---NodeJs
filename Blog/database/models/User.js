const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

/// Users, Posts, Products
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, 'Please provid your username'] // change content message
    },
    email: {
        type: String,
        required: [ true, 'Please provid your email'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Please provid your password']
    }
});

UserSchema.pre('save', function (next) { 
    const user = this;
    console.log(user);
    //10, 100
    bcrypt.hash(user.password, 10, function (error, encrypted) { 
        user.password = encrypted;
        console.log(user.password);
        
        next();
    })
})

module.exports = mongoose.model('User', UserSchema);