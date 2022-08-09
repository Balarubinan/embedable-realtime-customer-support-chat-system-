let devUrl="http://localhost:3500"
let prodUrl="SomthingSomthing"

let baseUrl=devUrl;// import Client from "socket.io-client"
// import {baseUrl} from "./URLs.js"

let socket=null

function initConn(callBack,isOp){
    socket=new io(baseUrl)
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
// let exportedFuns={
//     initConn:initConn,
//     sendMsg,
//     closeConn
// }
// export default exportedFuns;;

let cnt=0;

function Message(msgType,text){
  this.text=text
  // to ignore the seconds in the timeString
  this.time=new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  this.msgType=msgType
  // msgType=1 => incoming msg
  // msgType=2 => outgoing msg
}

function ChatComp(props) {
  let title="Operator: bot"
  const [msgs, setmsgs] = React.useState([])

  React.useEffect(()=>{
    // let tmp=[]
    // for(let i=0;i<10;i++)
    // tmp.push(new Message(i%2,"Hello Reckless"))
    // setmsgs(tmp)
    initConnection()
    console.log(props.isOp)
  },[])



  const handleText=(text)=>{
    // check for all kinds of entries
    // console.log(text)
    // CLIENT CONVO works but the messages are lost in the UI......check that 
    cnt++;
    console.log(msgs.length+"time"+cnt)
    console.log(...msgs)
    let tmp=[...msgs,new Message(1,text)]
    console.log(tmp)
    setmsgs(tmp)
  }

  const initConnection=()=>{
    initConn(handleText,props.isOp)
    console.log("Connection intialised")
  }

  const sendMessage=()=>{
    let chatBar=document.getElementById('chatBar')
    chatBar.scrollTop = chatBar.scrollHeight;
    let msg=chatBar.value
    chatBar.value=""
    console.log("send: "+msg.length)
    setmsgs([...msgs,new Message(0,msg)])
    sendMsg(msg)
    
  }

  const handleKeyDown = event => {
    console.log('User pressed: ', event.key);
    if (event.key === 'Enter') {
      sendMessage()
    }
  };

  return (
    <div className={!props.isOp?"modal-content":""}>
      {!props.isOp&&<div style={{
        "height":"70px",
        "backgroundColor":"blue",
        // "border-radius": "25px",
        "borderTopLeftRadius": "25px",
        "borderTopRightRadius": "25px",
        }}>
          <div>{title}</div>
      </div>}
      <div className='scrollparent' id="chatParent">
        <div textalign="center" className='chatParent scrollable'>
          {msgs.map(msg=>
          <div className={msg.msgType==1?"rbubble":"lbubble"} title={msg.time} key={msg.text}>
            {msg.text}
            <div className='chatTime'>
              {msg.time}
            </div>
          </div>)}
        </div>
        <div>
          <input id="chatBar" className='input-bar' placeholder='send' onKeyDown={handleKeyDown}></input>
        </div>
      </div>
    </div>
  )
}

// import ChatComp from './ChatComp'

const e = React.createElement;

function MainComp() {
    React.useEffect(()=>{
        var modal = document.getElementById("Modal");
        var btn = document.getElementById("Btn");
        var span = document.getElementsByClassName("close")[0];
        console.log(btn)
        btn.onclick = function(e) {
            console.log("Clicked")
            e.preventDefault()
            modal.style.display = "block";
        }
        span.onclick = function(e) {
            e.preventDefault()
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            event.preventDefault()
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    },[])
    const handleClick=(e)=>{
        var modal = document.getElementById("Modal");
        console.log("Clicked")
        e.preventDefault()
        modal.style.display = "block";
    }
    return (
        <>
        <div>
            <div id="Modal" className="modal">
                <div>
                    <span className="close">&times;</span>
                    <ChatComp isOp={false}/>
                </div>
            </div>
            <a href="#" className="float" onClick={handleClick}>
            <i className="fa fa-plus my-float" id="Btn"></i>
            </a>
        </div>
    </>
    )
}

const domContainer = document.getElementById('rootMain')
const root = ReactDOM.createRoot(domContainer);
root.render(e(MainComp));

// export default MainComp