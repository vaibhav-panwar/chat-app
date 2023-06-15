const express = require("express");
const {Server} = require("socket.io");
const http = require('http');
const {addUser,deleteUser} = require('./utils/others')
const app = express();
const path = require('path')
app.use(express.json());
app.use(express.static('public'));

app.get("/chat",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/chat.html"))
})
const server = http.createServer(app);

const io = new Server(server);
let users = [];
let myroom ;

io.on("connection",(socket)=>{
    console.log("a user is connected",socket.id);
    socket.on("join-room",(data)=>{
        socket.join(data.room);
        data.id = socket.id;
        myroom =data.room;
        let a = addUser(users,data);
        socket.broadcast.to(data.room).emit("new-user-joined",data.user)
        socket.broadcast.to(data.room).emit("joined-user",a);
    })
    socket.on("message",(data)=>{
        console.log(myroom)
        socket.broadcast.to(myroom).emit("recieve-msg",data);
    })
    socket.on("disconnect",()=>{
        let a = deleteUser(users,socket.id);
        socket.broadcast.to(myroom).emit("joined-user", users);
        socket.broadcast.to(myroom).emit("disconnected-user",a);
    })
})

server.listen(8080,()=>{
    console.log("connected at 8080");
})