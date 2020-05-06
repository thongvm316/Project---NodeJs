const User = require('../database/models/User');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            console.log(Object.keys(error.errors));
            const registrationsErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            console.log(registrationsErrors);
            req.flash('registrationsErrors', registrationsErrors)
            req.flash('data', req.body)            
            return res.redirect('/auth/register');
        } 
        res.redirect('/');
    })
};

//  req.flash dùng để lưu message err vào secssions, sử dụng một lần