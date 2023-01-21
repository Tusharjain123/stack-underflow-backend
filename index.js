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

app.use("/v1/signup" , require("./routes/SignUp.js"))
app.use("/v1/loggedin" , require("./routes/Login.js"))


app.get("/", (req,res)=>{
res.send("Working")})

const questionRoute = require('./routes/questions');
app.use('/question',questionRoute);

app.listen(process.env.PORT,()=>{
    console.log("Server is started")
})