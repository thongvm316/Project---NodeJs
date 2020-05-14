const Post = require('../models/Post');;

module.exports = (req, res) => {    
    Post.create({
        ...req.body,
        image: `/img/${req.file.filename}`,
        user_id: req.session.userId,
    }, (err, post) => {
         console.log(req.session.userId);
         res.redirect('/');
    });
};
