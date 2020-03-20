const express = require('express');


const app = new express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index')
})




app.listen(4000, () => {
    console.log('Port: 3000');
    
})