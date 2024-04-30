const express=require('express')
const app=express()
const cors=require('cors')
const router=require('./routes/Users')
const socket=require('socket.io')
const Allowed_origin=['*'];
var corOption={
    origin:Allowed_origin
}
var server = require('http').createServer(app);
portNo=8888
var io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8888",
    methods: ["GET", "POST","PUT","DELETE"]
  }
})

app.use(cors(corOption))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api/user',router)

app.listen(portNo,()=>{
    console.log(`Listening to port ${portNo}`)
})