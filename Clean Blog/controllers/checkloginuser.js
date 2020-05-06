const User = require('../models/User');
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        console.log(user);
       if (user) {
           bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    req.session.userId = user._id;
                    console.log(req.session.userId);
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
           })
       } else {
           return res.redirect('/auth/login');
       }
    });
};
