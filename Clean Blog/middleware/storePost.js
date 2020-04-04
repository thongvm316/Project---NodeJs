const validateCreatepostMiddleware = (req, res, next) => {
    if (!req.file || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/post/new')  
    }
    next();
};

module.exports = validateCreatepostMiddleware;