const mongoose = require("mongoose")

const StackUnderflowSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required : true
    },
    userVerification:{
        type : String,
        required: true
    }
})

module.exports = mongoose.model("user", StackUnderflowSchema)