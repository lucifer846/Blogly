const express = require('express'); // Importing Express framework
const router = express.Router(); // Creating a new router object
const Blog = require('../models/blog'); // Importing the Blog model

// Route to handle GET requests to the root of the '/blogs' route
router.get('/', (req, res) => {
  Blog.find() // Fetching all blog entries from the database
    .then(result => {
      res.render('index', { blogs: result, pageHeading: "Recent Blogs" }); // Rendering the 'index' template with the fetched blogs
    })
    .catch(err => console.error(err)); // Handling errors
});

// Route to render the 'create-blog' form
router.get('/create-blog', (req, res) => {
  res.render('create-blog'); // Rendering the 'create-blog' template
});

// Route to handle POST requests for creating a new blog
router.post('/', (req, res) => {
  const blog = new Blog(req.body); // Creating a new Blog instance with data from the request body

  blog.save() // Saving the new blog to the database
    .then(result => {
      res.redirect('/blogs'); // Redirecting to the '/blogs' route after saving
    })
    .catch(err => console.error(err)); // Handling errors
});

// Route to handle POST requests for searching blogs
router.post('/search', (req, res) => {
  const searchText = req.body.search; // Extracting the search text from the request body
  Blog.find({ title: { $regex: searchText, $options: 'i' } }) // Searching for blogs with titles that match the search text (case-insensitive)
    .then(result => res.render('index', { blogs: result, pageHeading: "Search Results" })) // Rendering the 'index' template with search results
    .catch(err => console.error(err)); // Handling errors
});

// Route to handle DELETE requests for deleting a blog by ID
router.delete('/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id) // Finding and deleting the blog by ID
    .then(result => {
      res.json({ redirect: '/' }); // Sending a JSON response with a redirect path
    })
    .catch(err => console.error(err)); // Handling errors
});

// Route to handle GET requests for a specific blog by ID
router.get('/:id', (req, res) => {
  const id = req.params.id; // Extracting the blog ID from the request parameters
  Blog.findById(id) // Finding the blog by ID
    .then(result => {
      res.render('details', { blog: result }); // Rendering the 'details' template with the fetched blog
    })
    .catch(err => console.error(err)); // Handling errors
});

module.exports = router; // Exporting the router to be used in other parts of the application
