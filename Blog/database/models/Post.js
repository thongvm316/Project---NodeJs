const mongoose = require('mongoose');

/// Users, Posts, Products
const PostSchema = new mongoose.Schema({
    title: String,
    // (property) content: StringConstructor,
    description: String,
    content: String
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;