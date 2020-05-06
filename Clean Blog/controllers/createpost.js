module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render('createpost')
    }
    res.redirect('/auth/login')
};
