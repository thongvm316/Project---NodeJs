const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');



// Middleware
const storePostMiddleware = require('./middleware/storePost')

// Model Mongoose
const Post = require('./models/Post');
const User = require('./models/User')

const app = new express();

mongoose.connect('mongodb://localhost/portfolio', { useNewUrlParser: true });

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
app.use(expressSession({
    secret: 'ThongVM'
}))
app.use(express.static('public'));


/* -------------------Render--------------------- */
app.get('/', (req, res) => {
    Post.find({}, (err, data) => {
        console.log(req.session)
        res.render('index', { data })
    }) 
})

app.get('/post/new', (req, res) => {
    if (req.session.UserId) {
        return res.render('createpost')
    }
    res.redirect('/auth/login')
})

app.get('/post/:id', (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        res.render('post', { data })
    })
})

app.post('/posts/store', upload.single('image'), storePostMiddleware, (req, res) => {    
    // Co the su dung middleware theo cach nay: app.use('/posts/store', validateCreatepostMiddleware);
    let img = req.file.filename;
    Post.create({
        ...req.body,
        image: `/img/${img}`
    }, (err, post) => {
         res.redirect('/');
    });       
})

app.get('/register', (req, res) => {
    res.render('register')
})


app.get('/auth/login', (req, res) => {
    res.render('login')
})

app.post('/users/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
       if (user) {
           bcrypt.compare(password, user.password, (err, same) => {
                if (password == user.password) {
                    console.log("Love...")
                    req.session.UserId = user._id;
                    res.redirect('/');
                } else {
                    console.log("Hate..." + err)
                    res.redirect('/auth/login');
                }
           })
       } else {
           return res.redirect('/auth/login');
       }
    });
});


app.post('/users/register', (req, res) => {
    User.create(req.body, (error, user) => {
        console.log(req.body)
       if(error) { 
           console.log(Object.keys(error.errors));
           return res.redirect('/register');
        }
        res.redirect('/auth/login')
    })
})





const port = 4000;
app.listen(4000, () => {
    console.log(`Port: ${port}`);
    
})