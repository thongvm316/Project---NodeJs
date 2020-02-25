const mongoose = require('mongoose');
const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/Blog', { useNewUrlParser: true });

Post.create({
    title: 'My second blog post',
    description: 'Second Blog post description',
    content: 'Lorem ipsum content'
}, (err, post) => {
    console.log(err, post);
});

Post.find({}, (err, posts) => {
    console.log(err, posts);
});


Post.find({
    title: 'My first blog post'
}, (err, posts) => {
    console.log(err, posts);
});

Post.findById('5e3e228a20a83e3350943196', (err, posts) => {
    console.log(err, posts);
});

Post.findByIdAndUpdate('5e3e228a20a83e3350943196', {
    title: 'Test Update'
}, (err, posts) => { console.log(err, posts) });
