const express=require('express');
const app=express();
const router =require('./routes/index')
const http = require('http');
const server = http.createServer(app)
const io =require('socket.io')(server)





app.set('view engine','ejs')
app.use(express.static('views'))
app.get('/',(req,res)=>{
    return res.render('index');
})

io.on('connection',socket=>{
    console.log('user is connected');
    socket.on('disconnect',()=>{
        console.log('user is disconnected');
    })
    socket.on('typing',()=>{
        console.log('he is typeing')
    })
    socket.on('chat message',(usermsg)=>{
        console.log("msg: "+ usermsg.msg);
        console.log("user: "+usermsg.user)
        io.emit('chat message',usermsg.user+" : "+usermsg.msg)
    })
})

    



server.listen(process.env.PORT || 3000)