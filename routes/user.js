const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:userId', async (req,res)=>{
    try {
        const user = await User.findById(req.params.userId);
        if(!user) { res.status(404).send('User not found') };
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({error:error})
    }
    
});

module.exports = router