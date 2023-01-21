const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../model/User.jsx");

router.get("/getUserData", async(req,res)=>{
    const data = await User.find({email : req.body.email})
    const choices = data.choices.split(",")
    res.status(200).send(choices)
})