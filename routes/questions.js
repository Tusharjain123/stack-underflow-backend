const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/User');

router.get('/all', async (req,res)=>{
    const questions = await Question.find();
    res.status(200).send(questions);
});

router.post('/new', async (req,res) => {
    try {
        const user = await User.findOne({email:req.body.email})
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