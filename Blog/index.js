const express = require('express');
const path = require('path');
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');

const app = new express();

app.use(express.static('public'));
app.use(engine);
app.set('views', `${__dirname}/views`);

mongoose.connect('mongodb://localhost/Blog', { useNewUrlParser: true });


app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
    // use template engine
    res.render('index');
});

app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render('about');
});

app.get('/post', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
    res.render('post');
});

app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
    res.render('contact');
});

app.get('/post/new', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
    res.render('create');
});



app.listen(3000, () => {
    console.log('Listening port 3000');
});