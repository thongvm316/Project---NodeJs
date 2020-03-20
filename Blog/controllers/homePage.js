const Post = require('../database/models/Post');

module.exports = (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
    // use template engine
    // const posts = await Post.find({}).populate('author');
    // console.log(posts);
    // // console.log(req.session);
    // res.render('index', {
    //     posts
    // });

  Post.find({}, function (err, posts) {    
    res.render('index', { posts });
  }).populate('author');
};
