const Post = require('../models/Post');;

module.exports = (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        console.log(data);
        res.render('post', { data })
    }).populate('user_id')
};
