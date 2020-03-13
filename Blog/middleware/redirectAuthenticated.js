module.exports = (req, res, next) => {
    if(req.session.userId) {
        // console.log(`test: ${req.session.userId}`)
        return res.redirect('/')
    }

    next()
}