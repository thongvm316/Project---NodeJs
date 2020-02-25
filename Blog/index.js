const express = require('express');
const path = require('path');
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const fileUpload = require('express-fileupload');

// Controllers
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');

const app = new express();

const validateCreatepostMiddleware = require('./middleware/storePost');

app.use(express.static('public'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(engine);
app.set('views', `${__dirname}/views`);

mongoose.connect('mongodb://localhost/Test', { useNewUrlParser: true });

app.get('/', homePageController);
app.get('/post/new', createPostController);
app.get('/post/:id', getPostController);
app.post('/posts/store', validateCreatepostMiddleware, storePostController);
app.get('/auth/register', createUserController);
//// su dung validate theo cach nay cung dc app.use('/posts/store', validateCreatepostMiddleware);
app.post('/users/register', storeUserController);

app.listen(3000, () => {
    console.log('Listening port 3000');
});