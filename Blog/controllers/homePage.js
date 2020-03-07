const Post = require('../database/models/Post');

module.exports = async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
    // use template engine
    const posts = await Post.find({});
    // console.log(req.session);
    res.render('index', {
        posts
    });
};
