const Post = require('../models/posts');
const fs = require('fs');

module.exports = class Api {

    //fetch all posts
    static async fetchAllPosts(req,res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    } 

    //fetch post by ID
    static async fetchPostByID(req,res) {
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    //Create a post
    static async createPost(req,res) {
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;

        try {
           await Post.create(post); 
           res.status(201).json({ message: 'Post Created Successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    //Update a post
    static async updatePost(req,res) {
        const id = req.params.id;
        let newimage = '';
        if(req.file){
            newimage = req.file.filename;
            try {
                fs.unlinkSync('./uploads/'+req.body.oldimage);
            } catch (error) {
                console.log(error);
            }
        }else{
            newimage = req.body.oldimage;
        }

        const newPost = req.body;
        newPost.image = newimage;
        
        try {
            await Post.findByIdAndUpdate(id,newPost);
            res.status(200).json({ message: 'Post Updated Successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    //Delete a post
    static async deletePost(req,res) {
        const id = req.params.id;

        try {
           const result =  await Post.findByIdAndDelete(id);
           if(result.image != ''){
                try {
                    fs.unlinkSync('./uploads/'+result.image); 
                } catch (error) {
                    console.log(error);
                }
           }
           res.status(200).json({ message: 'Post Deleted Successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}
