const User = require("../database/models/User")

module.exports = (req, res, next) => {
    // fetch user from dbs
     User.findById(req.session.userId, (err, user) => {
         if (err || !user) {
            //  console.log(err)
            //  console.log("test:" + req.session.userId)
             return res.redirect('/') 
         }

         next()
     })
    // verify user
    // if user is valid, permit req
    // esle redirect

}
// chua biet de lam gi