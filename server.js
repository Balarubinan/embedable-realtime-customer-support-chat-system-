var express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors=require('cors');
var express = require('express');
var app = express();
var Routes=require("./src/routes")

const { Server } =require("socket.io");

const {
  Operator,Client,
  defaultBotMessage, processBotMessage,
  replyText
}=require('./UtilityClasses');

let PORT=3500

app.use(cors())
// app.use(express.static('../ClientFolder/src/sampleHtmlSite'));
app.use(express.static('./ClientFolder/src/newSampleSite'));
app.use("/restApi",Routes)

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

// V4 with cors 
// use CORS only allows CORS on express but not on socket.io
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// old version
// const io = socket(server);

// check if there is any otther way to store these variables
// EVENTS
// initData => sent by Client(data={isOperator=true}) and 
// Operator (data={isOperator=true,name=<name>})
// chatIn => gets client's incoming chat
// chatOut => send text to client

let operators=[]
// using a hashmap to easily get client obj
let clients=new Map();

function findOperator(){

  // filter returns a damn new copy of the array
  // hence while calling allotedOperator.socket.on()
  // it sets a entirely new socket's on method 
  // hence the bug in the 
  // allotedOperator.socket.on('chatIn',data=>{
  // SOLN : return a damn ref object rubin!

  // update....fiter does return a shallow copy of the objects 
  // but the bug was'nt caused by copied elems
  // it was literally TO PUT ALL 'on' events before 'emit' events 
  // after that it works liek no other cchanges

  // update it worked like for a second....and then din't
  

  let freeOperator=operators.find(op=>op.isAvailable)
  // let freeOperators=operators.filter(op=>op.isAvailable)
  console.log(freeOperator)
  if(!freeOperator)
  return null
  else
  return freeOperator
}

io.on('connect',(socket)=>{
  console.log('A connection was Got'+socket.id)
  socket.on('initData',data=>{
    console.log(typeof data)
    if(data.isOperator){
      
      if(data.name){
        let tempOp=new Operator(data.name,socket)
        operators.push(tempOp)
        tempOp=tempOp.socket
        console.log("An operator connected"+data.name)
        tempOp.emit("chatOut",replyText("Youre ready to tend Clients!"))
        tempOp.onAny((eventName,data)=>{
          console.log("An event from OP"+eventName+"Data is"+JSON.stringify(data))
          console.log(tempOp.assignedClient)
          if(tempOp.assignedClient)
          tempOp.assignedClient.emit("chatOut",replyText(data.text))
        })
        // tempOp.on('chatIn',data=>{
        //   if(tempOp.assignedClient)
        //   tempOp.assignedClient.emit("chatOut",replyText(data.text))
        // })
      }
      else
      socket.emit("chatOut",replyText("ERR : no name specified "))
      // add fallback to handle no Name cases 
    }else{
      // sends a simply convo init message
      let clientIp=socket.request.connection.remoteAddress
      console.log("Ip address is "+clientIp)
      clients[clientIp]=new Client(clientIp,socket)
      console.log(defaultBotMessage())
      socket.emit('chatOut',replyText(defaultBotMessage()))
      socket.on('chatIn',data=>{
        if("123".includes(data.text)){
          socket.emit('chatOut',replyText(processBotMessage(data.text)))
        }else{
          // console.log(typeof data)
          // console.log(typeof data.text)
          // console.log(Object.keys(JSON.parse(data)))
          // POSTMAN sends data as default by string ( change to JSON in its settings)
          // socket.io does nothing to data , it simply transfers it
          // START HERE 
          let curClient=clients[clientIp]
          console.log("In hereh  data text: "+data.text)
          if((""+data.text).includes("4"))
          curClient.hasOperator=-1
          console.log(clients[clientIp].hasOperator)
          if(clients[clientIp].hasOperator==-1){
            let allotedOperator=findOperator()
            if(allotedOperator==null){
              // repeates two times why??
              console.log("alloted :",JSON.stringify(operators.length))
              socket.emit('chatOut',replyText("Sorry No Operators Available at the moment"))
            }else{
              allotedOperator.isAvailable=false
              allotedOperator.socket.on('chatIn',data=>{
                console.log("op texted client"+data.text)
                // clients[clientIp].socket.emit('chatOut',replyText(data.text))
                socket.emit('chatOut',replyText(data.text))
              })
              operators[0].socket.on('chatIn',data=>{
                console.log("op texted client"+data.text)
                // clients[clientIp].socket.emit('chatOut',replyText(data.text))
                socket.emit('chatOut',replyText(data.text))
              })
              socket.emit('chatOut',replyText("You are transferred to Operator : "+allotedOperator.name))
              socket.on('chatIn',data=>{
                console.log("client texted op "+data.text)
                allotedOperator.socket.emit('chatOut',replyText(data.text))
              })
              console.log('Cheking op socket')
              console.log(allotedOperator.socket)
              allotedOperator.assignedClient=""+socket.id
              console.log("aaasing")
              console.log(allotedOperator.assignedClient)
              
              // allotedOperator.socket.emit('chatOut',replyText('whatevre bitch'))

              // for whatever reason this doesn't work
              // so Im gonna try to store the clientSockId in Operators objct
              // and simply handle all events there

              // version 1
              // allotedOperator.socket.on('chatIn',data=>{
              // version 2
              // allotedOperator.socket.onAny((eventName,data)=>{

              
              curClient.hasOperator=1
            }
          }else{
           // ignore message 
           if(!clients[clientIp].hasOperator==1)
            socket.emit('chatOut',replyText("Could not understand your message")) 
          }
        }
      })
    }
  })
  // just for debug purposes
  socket.on('cleanServer',()=>{
    clients=new Map();
    operators=[]
  })
  // complete this tommorow
})

