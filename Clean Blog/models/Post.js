const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // tham chieu den User collection
        required: true
    },
    image: String,
    createAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
