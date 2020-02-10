const express = require('express');
const path = require('path');
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');


const app = new express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(engine);
app.set('views', `${__dirname}/views`);

mongoose.connect('mongodb://localhost/Blog', { useNewUrlParser: true });


app.get('/', async (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
    // use template engine
    const posts = await Post.find({});
    // console.log(posts);
    res.render('index', {
        posts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post
    });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', (req, res) => {
    Post.create(req.body, (err, post) => {
        res.redirect('/');
    });
});



app.listen(3000, () => {
    console.log('Listening port 3000');
});