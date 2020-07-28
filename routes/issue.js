const express = require('express')
const router = express.Router();
const Issue = require('../models/issue')

router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.title !== '' && req.query.title !== null){
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    try {
        const issues = await Issue.find(searchOptions)
        res.render('issues/index', {
            issues: issues,
            searchOptions: req.query
        })
    }
    catch (e){
        res.redirect('/')
    }
    
})

router.get('/new', (req, res) => {
    res.render('issues/new', {issue: new Issue()})
})

router.post('/', async (req, res) => {
    let issue = new Issue({
        title: req.body.title
    })
    try {
        issue = await issue.save()
        res.redirect('issues')
    }
    catch(e){
        res.redirect('issues/new', {
            issue: issue,
            errorMessage: 'Error creating Issue'
        })
    }
})



module.exports = router;