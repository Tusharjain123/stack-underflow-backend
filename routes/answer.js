const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const Answer = require('../models/Answer');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/User');

router.get('/all/:questionId',async (req,res)=>{
    try {
        const question = await Question.findById(req.params.questionId);
        res.status(200).send(question);
    } catch (error) {
        res.status(500).json({error:error})
    }
});

router.post('/create/:questionId', fetchUser ,async (req,res)=>{
    try {
        const question = await Question.findById(req.params.questionId);
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        const answer = new Answer({
            content: req.body.content,
            author: user
        });
        answer.save();
        await question.updateOne({ $push: {replies: answer}})
        res.status(200).send(answer);
    } catch (error) {
        res.status(500).json({error:error})
    }
    
});

module.exports = router;