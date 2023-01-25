const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const Answer = require('../models/Answer');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/User');

router.get('/all', async (req,res)=>{
    const answer = await Answer.find()
    res.send(answer)
})

router.get('/all/:questionId',async (req,res)=>{
    try {
        const answers = await Answer.find({question : req.params.questionId})
        res.status(200).send(answers);
    } catch (error) {
        res.status(500).json({error:error})
    }
});

router.delete('/delete/:answerId', fetchUser, async(req,res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId)
        const answer = await Answer.findById(req.params.answerId);
        // const author = await User.findById(answer.author);
        if(!answer) { return res.status(404).send('Answer not found') }
        // if(author.id != user.id){ return res.status(406).send("You aren't author of answer !!") }
        await answer.deleteOne();
        res.status(200).send('Answer deleted');
    } catch (error) {
        res.json({error:error})
    }
})

router.post('/create/:questionId', fetchUser ,async (req,res)=>{
    try {
        const question = await Question.findById(req.params.questionId);
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        const answer = new Answer({
            content: req.body.content,
            author: [user.name? user.name : "Anonymous", user] ,
            question: question
        });
        answer.save();
        await question.updateOne({ $push: {replies: answer}})
        res.status(200).send(answer);
    } catch (error) {
        res.status(500).json({error:error})
    }
    
});

module.exports = router;