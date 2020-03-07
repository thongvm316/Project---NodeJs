const User = require('../database/models/User');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            const registrationsErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            // console.log(registrationsErrors)
            req.session.registrationsErrors = registrationsErrors
            return res.redirect('/auth/register');
        } 
        res.redirect('/');
    })
};