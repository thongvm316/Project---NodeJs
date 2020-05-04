require('dotenv').config();
// console.log(process.env);
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlah = require('connect-flash');;

// Router
const indexRouter = require('./routes/index');

// Middleware
const storePostMiddleware = require('./middleware/storePost')
const authMiddleware = require('./middleware/auth')
// const checkHomePageMiddleware = require('./middleware/checkHomePage');

// Model Mongoose
const Post = require('./models/Post');
const User = require('./models/User')

const app = new express();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
app.use(connectFlah());

// Multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
var upload = multer({ storage: storage })

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


/* -------------------Render--------------------- */
app.use('/', indexRouter)

app.get('/post/new', (req, res) => {
    if (req.session.userId) {
        return res.render('createpost')
    }
    res.redirect('/auth/login')
})

app.get('/post/:id', (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        res.render('post', { data })
    }).populate('user_id')
})

app.post('/posts/store', upload.single('image'), storePostMiddleware, (req, res) => {    
    // Co the su dung middleware theo cach nay: app.use('/posts/store', validateCreatepostMiddleware);
    Post.create({
        ...req.body,
        image: `/img/${req.file.filename}`,
        user_id: req.session.userId,
    }, (err, post) => {
         console.log(req.session.userId);
         res.redirect('/');
    });
})




app.get('/auth/login', authMiddleware, (req, res) => {
    res.render('login')
})

app.post('/users/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        console.log(user);
       if (user) {
           bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    req.session.userId = user._id;
                    console.log(req.session.userId);
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
           })
       } else {
           return res.redirect('/auth/login');
       }
    });
});

app.get('/register' ,authMiddleware ,(req, res) => {
    const db = req.flash('data')[0];
    const errors = req.flash('registerErrors');
    // console.log(db);
    res.render('register', {
        errors, db  
    })
})

app.post('/users/register', (req, res) => {
    User.create(req.body, (error, user) => {
        // console.log(req.body)
       if(error) { 
           const registerErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            //    req.session.registerErrors = registerErrors;
            req.flash('registerErrors', registerErrors)
            req.flash('data', req.body)
           return res.redirect('/register');
        }
        res.redirect('/auth/login')
    })
})

app.get('/auth/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})

app.get('/auth/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})

app.use((req, res) => {
    res.render('not-found')
})

const port = 4000;
app.listen(4000, () => {
    console.log(`Port: ${port}`);
    
})