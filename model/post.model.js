const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Post = model('Post', postSchema);

module.exports = Post;