const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/User');

router.get('/', async (req,res)=>{
    res.send('question route')
});

router.post('/new', async (req,res) => {
    try {
        const user = User.findById(req.body.userId)
        const new_question = new Question({
            content: req.body.content,
            author: user
        })
        new_question.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({message : err})  
          })
          
    } catch (error) {
        res.status(500).json({error:error})
    }
})

module.exports = router;