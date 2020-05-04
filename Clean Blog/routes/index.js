const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
    Post.find({}, (err, data) => {
        // console.log(data);
        res.render('index', { data })
    }).populate('user_id') 
});


router.get('/post/new', (req, res) => {
    if (req.session.userId) {
        return res.render('createpost')
    }
    res.redirect('/auth/login')
})




module.exports = router;
