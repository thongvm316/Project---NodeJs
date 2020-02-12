const express = require('express');
const path = require('path');
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const fileUpload = require('express-fileupload');

const app = new express();


const validateCreatepostMiddleware = (req, res, next) => {
    if (!req.files || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/post/new');
    }
    next();
};



app.use(express.static('public'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(engine);
app.set('views', `${__dirname}/views`);
app.use('/posts/store',validateCreatepostMiddleware);




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

// app.get('/post/:id', async (req, res) => {
//     const post = await Post.findById(req.params.id);
//     console.log(post);
//     res.render('post', {
//         post
//     });
// });

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', (req, res) => {
    const { image } = req.files;
    console.log(image);

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (err) => {
        // Post.create(req.body, (err, post) => {
        //     res.redirect('/');
        // });
        // dung de them filed vao tempalte, do tren web ko co truog nay
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (err, post) => {
            res.redirect('/');
        });
    });

});



app.listen(3000, () => {
    console.log('Listening port 3000');
});