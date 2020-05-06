const Post = require('../models/Post');;

module.exports = (req, res) => {
    Post.find({}, (err, data) => {
        // console.log(data);
        res.render('index', { data })
    }).populate('user_id') 
};