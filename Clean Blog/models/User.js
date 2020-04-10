const mongoose = require('mongoose')
var bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function (next) { 
    const user = this;
    console.log(user);
    //10, 100
    bcrypt.hash(user.password, 10, function (error, encrypted) { 
        user.password = encrypted;
        console.log("bcrypt: " + user.password);
    })
    next();
})

module.exports =  mongoose.model('User', UserSchema);

