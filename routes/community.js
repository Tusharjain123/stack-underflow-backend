const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();

router.get('/', async (req,res)=>{
    res.send('Community')
})

module.exports = router;