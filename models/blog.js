const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction
const Schema = mongoose.Schema; // Creating a shorthand reference for Mongoose Schema

// Defining a new schema for the blog model
const blogSchema = new Schema({
  title: {
    type: String, // The title of the blog, must be a string
    required: true // This field is required, cannot be empty
  },
  text: {
    type: String, // The text/content of the blog, must be a string
    required: true // This field is also required, cannot be empty
  }
});

// Creating a Mongoose model named 'Blog' based on the blogSchema
const Blog = mongoose.model('blog', blogSchema);

// Exporting the Blog model to be used in other parts of the application
module.exports = Blog;
