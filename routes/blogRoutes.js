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
router.delete('/:id', (req,res)=>{
    Blog.findByIdAndDelete(req.params.id)
        .then(result=>{
            res.json({redirect:'/'})
        })
})
router.get('/:id', (req,res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then(result=>{
            res.render('details', {blog:result})
        }).catch
})


module.exports = router
