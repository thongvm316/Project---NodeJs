const Post = require('../database/models/Post');
const path = require('path');

module.exports = (req, res) => {
    const { image } = req.files;
    console.log(req.files);
    console.log(req.body);


    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (err) => { // '..' dung de back ra ngoai, roi vao public --> posts
        // Post.create(req.body, (err, post) => {
        //     res.redirect('/');
        // });
        
        // dung de them filed vao tempalte, do tren web ko co truog nay
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`,
            author: req.session.userId
        }, (err, post) => {
            res.redirect('/');
        });
    });
}


