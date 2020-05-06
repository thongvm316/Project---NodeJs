const User = require('../models/User');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        // console.log(req.body)
       if(error) { 
           const registerErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            //    req.session.registerErrors = registerErrors;
            req.flash('registerErrors', registerErrors)
            req.flash('data', req.body)
           return res.redirect('/register');
        }
        res.redirect('/auth/login')
    })
};
