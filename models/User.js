const mongoose = require("mongoose")

const TabifySchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: Number,
        required : true
    },
    choices : {
        type: String,
        required : true
    }
})

module.exports = mongoose.model("user", TabifySchema)