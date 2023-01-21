const express = require("express")
const router = express.Router()
const User = require("../models/User.js")
const { body, validationResult } = require("express-validator")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")


router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", `Password must be atleast 5 characters`).isLength({ min: 5 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exist" })
      }
      const salt = await bcrypt.genSalt(10)
      const secPass= await bcrypt.hash(req.body.password,salt)
      const authToken = jwt.sign(req.body, process.env.JWT_Secret)
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        userVerification : authToken
      })
      res.json({user})
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Servor Error")
    }
  })
  

  module.exports = router
