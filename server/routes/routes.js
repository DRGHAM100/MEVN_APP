const express = require("express");
const router = express.Router();
const API = require('../controllers/api');
const multer = require('multer');


// multer middleware
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename : function(req,file,cb){
        cb(null,file.filename+"_"+Date.now()+"_"+file.originalname);
    },
})

let upload = multer({
    storage: storage
}).single("image");

router.get('/',API.fetchAllPosts);

router.get('/:id',API.fetchPostByID);

router.post('/',upload,API.createPost);

router.patch('/:id/edit',upload,API.updatePost);

router.delete('/:id/delete',API.deletePost);
// we use patch instead of put because patch allow us to update the record partially

module.exports = router;