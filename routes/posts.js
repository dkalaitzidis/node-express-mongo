const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Post = require('../models/Post');

//All Posts
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err) {
        res.json({ message: err });
    }
});

//Get a specific Post
router.get('/:postId', async  (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch(err) {
        res.json({ message: err });
    }
});

//Submit a Post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } 
    catch(err) {
        res.json({ message: err });
    } 
});

//Delete a Post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    }
    catch(err) {
        res.json({ message: err });
    }
});

//Update a Post
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne({ _id: req.params.postId },
                                                { $set: { title: req.body.title } }
        );
        res.json(updatePost);
    }
    catch(err) {
        res.json({ message: err });
    }
})
module.exports = router;