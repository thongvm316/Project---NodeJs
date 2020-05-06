const Post = require('../models/Post');;

module.exports = (req, res) => {    
    // Co the su dung middleware theo cach nay: app.use('/posts/store', validateCreatepostMiddleware);
    Post.create({
        ...req.body,
        image: `/img/${req.file.filename}`,
        user_id: req.session.userId,
    }, (err, post) => {
         console.log(req.session.userId);
         res.redirect('/');
    });
};
