const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Question = Schema({
    content : {
        type: String,
        required: true
    },
    author : {
        type: Array,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Question", Question)