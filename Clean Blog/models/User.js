const mongoose = require('mongoose')

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

// Use middleware Pre to hash password...

// UserSchema.pre('save', function (next) { 
//     const user = this;
//     console.log(user);
//     //10, 100
//     bcrypt.hash(user.password, 10, function (error, encrypted) { 
//         user.password = encrypted;
//         console.log(user.password);
        
//         next();
//     })
// })

module.exports = mongoose.model('User', UserSchema)