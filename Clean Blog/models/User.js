const mongoose = require('mongoose')
var md5 = require('md5');

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
}, { collection: 'UserRegister' })

UserSchema.pre('save', function (next) { 
    const user = this;
    // console.log(user);
    const hashPassword = md5(user.password);
    console.log(hashPassword);
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;



