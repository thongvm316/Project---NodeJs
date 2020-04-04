const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,

    image: String,
    createAt: {
        type: Date,
        default: new Date()
    }
}, { collection: 'UserPost' });

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
