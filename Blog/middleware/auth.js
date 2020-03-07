const User = require("../database/models/User")

module.exports = (req, res, next) => {
    // fetch user from dbs
     User.findById(req.session.UserId, (err, user) => {
         if (err) {
             console.log(err)
             console.log("test:" + req.session.UserId)
             return res.redirect('/') 
         }

         next()
     })
    // verify user
    // if user is valid, permit req
    // esle redirect

}