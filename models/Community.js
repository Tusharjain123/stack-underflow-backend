const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Community = Schema({
    topic : {
        type: String,
        required : true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'user'
    }]
})

module.exports = mongoose.model("Community", Community)