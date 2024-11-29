const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.get('/', (req,res)=>{
    Blog.find()
    .then(result=>{res.render('index', {blogs:result})})
})
router.get('/create-blog', (req,res)=>{
res.render('create-blog')
})
router.post('/', (req, res)=>{
    const blog = new Blog(req.body)

    blog.save()
    .then(result=>{
        res.redirect('/blogs')
    })
})


module.exports = router
