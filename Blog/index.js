require('dotenv').config();
// console.log(process.env);
const express = require('express');
const path = require('path');
const { config, engine } = require('express-edge');
const bodyParser = require('body-parser');
// const Post = require('./database/models/Post');
const mongoose = require('mongoose');


const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require("connect-mongo");
const cloudinary = require('cloudinary');
const connectFlash = require('connect-flash');
// const edge = require('edge.js'); tim hieu sau

// Controllers
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const app = new express();
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
app.use(connectFlash());

cloudinary.config({
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME
})

const mongoStore = connectMongo(expressSession);  // dung de store sessions vao mongoDb // them collection, con nhung thu da hoc, them document

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({ 
        mongooseConnection: mongoose.connection
    })
}))
 
// middleware
const validateCreatepostMiddleware = require('./middleware/storePost');
const auth = require("./middleware/auth"); // chua biet de lam go
const redirectAuthenticated = require('./middleware/redirectAuthenticated') 

app.use(express.static('public'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(engine);
app.set('views', `${__dirname}/views`);

// app.use('*', (req, res, next) => {
//     edge.global('auth', req.session.userId);
//     next();
// }) tim hieu sau


app.get('/', homePageController);
app.get('/post/new', createPostController);
app.get('/post/:idddd', getPostController);
app.post('/posts/store', validateCreatepostMiddleware, storePostController);
app.get('/auth/register', createUserController);
app.get('/auth/login', redirectAuthenticated, loginController);
app.get('/auth/logout', logoutController);
//// su dung validate theo cach nay cung dc app.use('/posts/store', validateCreatepostMiddleware);
app.post('/users/login', loginUserController);
app.post('/users/register', storeUserController);
app.use((req, res) => {res.render('not-found')})

app.listen(process.env.PORT, () => {
    console.log(`Listening port ${process.env.PORT}`);
});

