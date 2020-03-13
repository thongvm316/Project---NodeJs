const mongoose = require('mongoose');

/// Users, Posts, Products
const PostSchema = new mongoose.Schema({
    title: String,
    // (property) content: StringConstructor,
    subtitle: String,
    content: String,
    // username: String bo di, ?
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // tham chieu den User collection
        required: true
    },
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;