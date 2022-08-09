import Client from "socket.io-client"
import {baseUrl} from "./URLs.js"

let socket=null

function initConn(callBack,isOp){
    socket=new Client(baseUrl)
    console.log("init done")
    if(isOp)
    socket.emit('initData',{isOperator:isOp,name:"Rubin"})
    else
    socket.emit('initData',{isOperator:isOp})
    socket.on('chatOut',data=>{
        callBack(data.text)
    })
}

function sendMsg(msg){
    console.log("send mesh")
    socket.emit('chatIn',{text:msg})
}

function closeConn(){
    socket.close()
}
let exportedFuns={
    initConn:initConn,
    sendMsg,
    closeConn
}
export default exportedFuns;