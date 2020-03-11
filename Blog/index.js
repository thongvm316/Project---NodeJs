const express = require('express');
const path = require('path');
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require("connect-mongo");
const connectFlash = require('connect-flash');

// Controllers
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

const app = new express();
mongoose.connect('mongodb://localhost/Test', { useNewUrlParser: true });
app.use(connectFlash());
const mongoStore = connectMongo(expressSession);  // dung de store sessions vao mongoDb // them collection, con nhung thu da hoc, them document

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({ 
        mongooseConnection: mongoose.connection
    })
}))
 
const validateCreatepostMiddleware = require('./middleware/storePost');
const auth = require("./middleware/auth");
const redirectAuthenticated = require('./middleware/redirectAuthenticated') 

app.use(express.static('public'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(engine);
app.set('views', `${__dirname}/views`);


app.get('/', homePageController);
app.get('/post/new', auth, createPostController);
app.get('/post/:id', getPostController);
app.post('/posts/store',auth , validateCreatepostMiddleware, storePostController);
app.get('/auth/register', redirectAuthenticated, redirectAuthenticated, createUserController);
app.get('/auth/login', redirectAuthenticated, loginController);
//// su dung validate theo cach nay cung dc app.use('/posts/store', validateCreatepostMiddleware);
app.post('/users/login', redirectAuthenticated, loginUserController);
app.post('/users/register', redirectAuthenticated,  storeUserController);

app.listen(3000, () => {
    console.log('Listening port 3000');
});