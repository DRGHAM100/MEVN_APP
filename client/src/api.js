import axios from "axios";
const url = "/api/post";

export default class API {
    // get All Posts
    static async getAllPosts(){
        const res = await axios.get(url);
        return res.data;
    }
    // get Post By ID
    static async getPostByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    // Insert Post Into DB
    static async addPost(post){
        const res = await axios.post(url,post);
        return res.data;
    }

    // Update Post 
    static async updatePost(id,post){
        const res = await axios.patch(`${url}/${id}/edit`,post);
        return res.data;
    }

    // Delete Post 
    static async deletePost(id){
        const res = await axios.delete(`${url}/${id}/delete`);
        return res.data;
    }
}