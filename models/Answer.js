const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Answer = Schema({
    content : {
        type: String,
        required: true
    },
    author : {
        type: Array,
        required : true
    },
    question :{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Answer", Answer)