const connectToMongo = require("./db")
const express = require("express")
const cors = require("cors")
const run = async () =>{
  await connectToMongo()
}
run()

const app = express() 
app.use(cors({
    origin: "*"
}))

app.use(express.urlencoded({ extended: true })); 
app.use(express.json())


app.get("/", (req,res)=>{
res.send("Working")})


app.listen(process.env.PORT,()=>{
    console.log("Server is started")
})