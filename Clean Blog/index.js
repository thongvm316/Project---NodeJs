require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo'); // store session
const connectFlah = require('connect-flash');

// Controllers
const homePageController = require('./controllers/homepage');
const createPostController = require('./controllers/createpost');
const getPostController = require('./controllers/getpost');
const storePostController = require('./controllers/storepost');
const loginPageController = require('./controllers/loginpage');
const checkLoginUserController = require('./controllers/checkloginuser');
const registerPageController = require('./controllers/registerpage');
const createUserController = require('./controllers/createuser');
const logoutController = require('./controllers/logout');

// Middleware
const storePostMiddleware = require('./middleware/storePost')
const authMiddleware = require('./middleware/auth')
const checkHomePageMiddleware = require('./middleware/checkHomePage');

const app = new express();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
app.use(connectFlah());

// Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
const upload = multer({ storage: storage })

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoStore = connectMongo(expressSession);
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))
app.use(express.static('public'));

// Render
app.get('/', checkHomePageMiddleware, homePageController); //
app.get('/post/new', createPostController); //
app.get('/post/:id', getPostController)//
app.post('/posts/store', upload.single('image'), storePostMiddleware, storePostController)
app.get('/auth/login', authMiddleware, loginPageController) //
app.post('/users/login', checkLoginUserController); //
app.get('/register', authMiddleware, registerPageController) // 
app.post('/users/register', createUserController) //
app.get('/auth/logout', logoutController) // 
app.use((req, res) => {
    res.render('not-found') //
})

const port = 4000;
app.listen(4000, () => {
    console.log(`Port: ${port}`);
})