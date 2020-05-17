const Post = require('../../model/post.model');

module.exports.index = async (req, res) => {
    let posts = await Post.find();
    res.json(posts);
}