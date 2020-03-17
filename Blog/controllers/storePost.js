const Post = require('../database/models/Post');
const path = require('path');
const cloudinary = require('cloudinary');

module.exports = (req, res) => {
    const { image } = req.files;
    // console.log(req.files);
    // console.log(req.body);
    const uploadPath = path.resolve(__dirname, '..', 'public/posts', image.name);
    console.log(uploadPath);
    image.mv(uploadPath, (err) => { 
        if (err) {
          return res.redirect('/')
        }
        cloudinary.v2.uploader.upload(uploadPath, (err, result) => {
            Post.create({
                ...req.body,
                image: result.secure_url, // thay the 54
                author: req.session.userId
                //image: `/posts/${image.name}`
            }, (err, post) => {
                console.log(post);
                res.redirect('/');
            }); 
        });    
        // '..' ]dung de back ra ngoai, roi vao public --> posts
        // Post.create(req.body, (err, post) => {
        //     res.redirect('/');
        // });
        
        // dung de them filed vao tempalte, do tren web ko co truog nay
       
    });
}


