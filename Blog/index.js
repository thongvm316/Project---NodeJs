const express = require('express');
const app = new express();
const path = require('path');
const { config, engine } = require('express-edge');


app.use(express.static('public'));
app.use(engine);
app.set('views', `${__dirname}/views`);


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
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});










app.listen(4000, () => {
    console.log('Listening port 4000');
});