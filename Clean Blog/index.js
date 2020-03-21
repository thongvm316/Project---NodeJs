const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

// Model Mongoose
const Post = require('./models/Post');

const app = new express();
mongoose.connect('mongodb://localhost/portfolio', { useNewUrlParser: true });

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

/* -------------------Render--------------------- */
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/post/new', (req, res) => {
    res.render('createpost')
})

app.post('/posts/store', (req, res) => {
    console.log(req.body);
    res.redirect('/');
    
    // Post.create({
    //     ...req.body,
    // }, (err, post) => {
    //     console.log(post);
    //     res.redirect('/');
    // }); 
})



const port = 4000;
app.listen(4000, () => {
    console.log(`Port: ${port}`);
    
})