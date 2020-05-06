module.exports = (req, res) => {
    const db = req.flash('data')[0];
    const errors = req.flash('registerErrors');
    // console.log(db);
    res.render('register', {
        errors, db  
    })
};
