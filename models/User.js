const mongoose = require("mongoose")

const StackUnderflowSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: Number,
        required : true
    }
})

module.exports = mongoose.model("user", StackUnderflowSchema)