const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
})

const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog;
