const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

let client=null,cleaner=null
let callbackCnt=0

beforeEach(()=>{
    const PORT=3500
    client=new Client("http://localhost:3500")
    client.on('connect',()=>{
        console.log("server connected")
    })
    cleaner=new Client("http://localhost:3500")
    cleaner.clean=()=>{
        cleaner.emit("clearServer")
    }
})

afterEach(() => {
    client.close();
    cleaner.clean()
});

test("client first connects",done=>{
    client.on('chatOut',data=>{
        expect(data.text).toContain("Reck")
        done()
    })
    client.emit('initData',{isOperator:false})
})

test("client connects but no Operator",done=>{
    // requesting operator
    callbackCnt=0;
    client.on('chatOut',data=>{
        callbackCnt++
        if(callbackCnt==2){
            expect(data.text).toContain("No")
            done()
        }
    })
    client.emit('initData',{isOperator:false})
    client.emit("chatIn",{text:"4"})
})

test("client connects and operator is available",done=>{
    let operator=new Client("http://localhost:3500")
    operator.on("chatOut",data=>{})
    callbackCnt=0;
    client.on('chatOut',data=>{
        callbackCnt++
        if(callbackCnt==2){
            expect(data.text).toContain("Default operator")
            expect(data.text).toContain(":")
            done()
        }
        // jest does'nt allow chaining matcher together
        // can use it by installing jest-chain
    })
    operator.emit("initData",{isOperator:true,name:"Default operator"})
    client.emit('initData',{isOperator:false})
    client.emit("chatIn",{text:"4"})
})

test("client and operator chat to each other",done=>{
    let operator=new Client("http://localhost:3500")
    operator.on("chatOut",data=>{
        console.log(data.text)
        if(!data.text.includes("!")){
            expect(data.text).toContain("Hi")
        }
    })
    callbackCnt=0;
    client.on('chatOut',data=>{
        callbackCnt++
        console.log(callbackCnt)
        if(callbackCnt==3){
            expect(data.text).toContain("Hello")
            done()
        }
        // jest does'nt allow chaining matcher together
        // can use it by installing jest-chain
    })
    operator.emit("initData",{isOperator:true,name:"Default operator"})
    client.emit('initData',{isOperator:false})
    client.emit("chatIn",{text:"4"})
    client.emit("chatIn",{text:"Hi mr operator"})
    operator.emit("chatIn",{text:"Hello Mr Client"})
})

test("Operator dint supply name",done=>{
    client.on('chatOut',data=>{
        expect(data.text).toContain("ERR")
        done()
    })
    client.emit("initData",{isOperator:true})

})

test("Operator allocation in presence of mutiple Operators",done=>{
    let ops=[5]
    for(let i=0;i<5;i++){
        ops[i]=new Client("http://localhost:3500")
        ops[i].emit("initData",{name:"Operator"+i,isOperator:true})
    }
    callbackCnt=0;
    client.on('chatOut',data=>{
        callbackCnt++
        console.log(callbackCnt)
        if(callbackCnt==2){
            console.log(data.text)
            expect(data.text).toContain("to")
            done()
        }
        // jest does'nt allow chaining matcher together
        // can use it by installing jest-chain
    })
    client.emit('initData',{isOperator:false})
    client.emit("chatIn",{text:"4"})
    client.emit("chatIn",{text:"Hi mr operator"})
})


