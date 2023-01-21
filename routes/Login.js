const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const { body, validationResult } = require("express-validator")
const User = require("../models/User.js");

router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({msg : "Error occured"});
    }
    const {email, password} =req.body
    try {
      let user = await User.findOne({email})
      if (!user){
        return res.status(400).json({error: "Please try to login with correct credential"})
      }
      const passwordCompare = await bcrypt.compare(password, user.password)
  
      if (!passwordCompare){
        return res.status(400).json({error: "Pleasr try to login with correct credential"})
      }
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data,process.env.JWT_Secret)
      let success = true;
      res.setHeader("auth-token", authtoken)
      res.json({ success, authtoken })
     
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Servor Error")
    }
  
  })

  module.exports = router
  