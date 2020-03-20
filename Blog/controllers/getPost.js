const Post = require('../database/models/Post');

module.exports = async (req, res) => {
    // console.log('id:' + req.params.idddd);
    const post = await Post.findById(req.params.idddd).populate('author');
    console.log(post);
    res.render('post', {
        post
    });
}