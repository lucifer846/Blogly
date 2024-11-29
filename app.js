const express = require('express')
const app = express()
const morgan = require('morgan')
const blogRoutes = require('./routes/blogRoutes')
const mongoose = require('mongoose')

const dbURI = "mongodb+srv://saurabh:ConorMcgregor@nodejscluster.ns38w.mongodb.net/Blogly?retryWrites=true&w=majority&appName=NodejsCluster"

mongoose.connect(dbURI)
.then(()=>{
    console.log("connected to db")
})
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))


app.get('/',(req, res)=>{
    res.redirect('/blogs')
})
app.get('/about', (req, res)=>{
    res.render('about')
})
app.use('/blogs',blogRoutes)

app.listen(3000)
