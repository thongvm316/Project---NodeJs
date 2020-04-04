const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');


// Middleware
const storePostMiddleware = require('./middleware/storePost')

// Model Mongoose
const Post = require('./models/Post');

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
app.use(express.static('public'));


/* -------------------Render--------------------- */
app.get('/', (req, res) => {
    Post.find({}, (err, data) => {
        // console.log(data[1])
        res.render('index', { data })
    }) 
})

app.get('/post/new', (req, res) => {
    res.render('createpost')
})

app.get('/post/:id', (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        res.render('post', { data })
    })
})

app.get('/register', (req, res) => {
    res.render('register')
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

const port = 4000;
app.listen(4000, () => {
    console.log(`Port: ${port}`);
    
})