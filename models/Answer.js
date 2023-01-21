const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Answer = Schema({
    content : {
        type: String,
        required: true
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Answer", Answer)