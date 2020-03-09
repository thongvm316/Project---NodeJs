module.exports = (req, res) => { 
    console.log(req.session.registrationsErrors)
    res.render('register', {
        errors : req.flash('registrationsErrors')
    });
};