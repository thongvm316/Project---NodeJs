module.exports = (req, res, next) => {
    if(req.session.UserId) {
        return res.redirect('/')
    }

    next()
}