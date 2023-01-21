const express = require("express")
const router = express.Router()
const User = require("../models/User.js")
var fetchuser = require("../middleware/fetchuser")

router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Servor Error")
    }
})

module.exports = router  