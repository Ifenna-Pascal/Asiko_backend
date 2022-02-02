const Post = require('../models/post');
const User = require('../models/user');
const cloudinary = require('cloudinary');


exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        if (!posts) {
            return res.status(400).json({ message: 'No Posts' });
        }
        return res.status(200).json({ posts });
    } catch (error) {
        next(error); 
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const result = await cloudinary.v2.uploader.upload(req.files.file.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: 'auto'
        });
    
        const newPost = await new Post({
            userId: req.user.id,
            caption: req.body.caption,
            image: result.url
        }).save();
    
    
        User.findById(req.user.id, async (err, foundUser) => {
            if (err) throw err;
            foundUser.posts.push(newPost._id);
            foundUser.save((err, saved) => {
                if (err) throw err;
                else return res.status(400).json({ message: 'Post Uploaded Successfully!' });
            });
        });
    } catch (error) {
        next(error);
    }
}