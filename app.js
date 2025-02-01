const express = require('express'); // Importing the Express framework
const app = express(); // Creating an Express application
const morgan = require('morgan'); // Importing Morgan for HTTP request logging
const blogRoutes = require('./routes/blogRoutes'); // Importing blog routes from external file
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction

// MongoDB connection string (Replace with your actual credentials for security reasons)
const dbURI = "mongodb+srv://<user>:<password>@nodejscluster.ns38w.mongodb.net/Blogly?retryWrites=true&w=majority&appName=NodejsCluster";

// Connecting to MongoDB using Mongoose
mongoose.connect(dbURI)
  .then(() => {
    console.log("connected to db"); // Log message on successful connection
  })
  .catch(err => console.log(err)); // Log error if connection fails

app.set('view engine', 'ejs'); // Setting EJS as the view engine for rendering templates
app.use(express.static('public')); // Serving static files from the 'public' directory
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies (form submissions)

// Redirecting the root URL to /blogs
app.get('/', (req, res) => {
  res.redirect('/blogs'); // Redirect to the blogs route
});

// Handling GET request for the 'about' page
app.get('/about', (req, res) => {
  res.render('about'); // Render the 'about' EJS template
});

// Using the imported blog routes for handling requests starting with '/blogs'
app.use('/blogs', blogRoutes);

// Starting the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000'); // Log message when the server starts
});
