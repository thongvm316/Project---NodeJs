const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var multer = require('multer');


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

app.post('/posts/store', upload.single('image'), (req, res) => {    
    console.log(req.file.originalname)
    Post.create({
        ...req.body,
    }, (err, post) => {
        return res.redirect('/');
    });       
})



const port = 4000;
app.listen(4000, () => {
    console.log(`Port: ${port}`);
    
})