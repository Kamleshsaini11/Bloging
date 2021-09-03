const express = require('express')
const router = express.Router()
const articledb = require('./../model/article')

router.get('/', async (req, res) => {
    const articles = await articledb.find()
    res.render('index',{articles:articles})
})

router.get('/new', (req, res) => {
    res.render('article/new',{article:new articledb()});
})

router.post('/', async (req, res) => {
    await articledb.create({
        title: req.body.title,
        descreption : req.body.descreption,
        markdown : req.body.markdown,
        createdAt : Date.now
    })
    .then(article => {
        // console.log(article)
        res.render('article/show',{article:article})
    })
    .catch(err => {
        console.log("Something goes wrong",err)
        res.redirect('articles/new')
    })
})

router.get('/:id', async (req, res) => {
    const article = await articledb.findById(req.params.id)
    res.render('article/show',{article:article})
})

router.get('/edit/:id', async (req, res) => {
    const article = await articledb.findById({_id:req.params.id})
    res.render('article/edit',{article:article})
})

router.put('/:id', async (req, res) => {
    // console.log('inside edit put reqest')
    await articledb.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            title: req.body.title,
            descreption : req.body.descreption,
            markdown : req.body.markdown,
        }
    })
    .then(() => {
        console.log("updation successfull!!")
        res.redirect('/articles')
    })
    .catch(err => console.log("Something goes wrong",err))
})

router.delete('/:id', async (req, res) => {
    console.log('inside delete router')
    await articledb.findByIdAndDelete({_id:req.params.id})
    res.redirect('/articles')
})

module.exports = router