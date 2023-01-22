const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:userId', async (req,res)=>{
    const user = await User.findById(req.params.userId);
    res.status(200).send(user);
});

module.exports = router