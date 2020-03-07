const User = require("../database/models/User")
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    // the login process
    const { email, password } = req.body
    // try to find the user
    User.findOne({ email }, (err, user) => {
        if(user) {
            // compare user password
            bcrypt.compare(password, user.password, (err, same) => {
                if(same) {
                    //store user session
                    req.session.userId = user._id
                    // console.log(req.session)
                    res.redirect('/')
                } else {
                    res.redirect('/auth/login')
                }
            })
        } else {
            return res.redirect('/auth/login')
        }
    })
    //if user password is correct, then login user
    //else -> redirect user back
} 