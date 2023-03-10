const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const Answer = require('../models/Answer');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/User');

router.get('/all', async (req,res)=>{
    const questions = await Question.find({}).sort({date: -1});
    res.status(200).send(questions);
});

router.get('/get/:questionId', async(req,res)=> {
    try {
        const question = await Question.findById(req.params.questionId);
        res.status(200).send(question)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.delete('/delete/:questionId', async (req,res)=> {
    try {
        const question = await Question.findById(req.params.questionId);
        await question.deleteOne();
        await Answer.deleteMany({question : req.params.questionId})

        res.status(200).send('Successfully Q deleted')
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.post('/new',fetchUser ,async (req,res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        const new_question = new Question({
            content: req.body.content,
            author: [user.name? user.name : "Anonymous", user] 
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