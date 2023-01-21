const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI=process.env.MONGODB_URI
const connectToMongo = async()=>{
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>
{console.log("Connected to Mongo")}).catch((err)=>{
    console.log(err)
})
}

module.exports = connectToMongo