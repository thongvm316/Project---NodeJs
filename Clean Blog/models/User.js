const mongoose = require('mongoose')
var bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username ']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email '],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide your password ']
    }
})

UserSchema.pre('save', function (next) { 
    const user = this;
    console.log(user);
    //10, 100
    bcrypt.hash(user.password, 10, function (error, encrypted) { 
        user.password = encrypted;
        // console.log("bcrypt: " + user.password);
        next();
    })
})

module.exports =  mongoose.model('User', UserSchema);


