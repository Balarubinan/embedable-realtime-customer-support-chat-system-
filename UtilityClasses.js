function Operator(name,socket){
    this.name=name
    this.socket=socket
    this.isAvailable=true
    this.assignedClient=null
}

function Client(ip,socket){
    this.ip=ip
    this.socket=socket
    this.hasOperator=false
    // if has operator ( 0=> no operator 
    // -1 => needs operator , 1=> op alloted)
}

function defaultBotMessage(){
    return "Welcome to Reckless's Company\
    This is an automated response\
    follow the below instructions to get started\
    1) business product details\
    2) info about work hours\
    3) make an E-order\
    4) chat with live operator\
    \
    select appropraite choice to continue...."
}

function processBotMessage(option){
    switch(option){
        case 1:
            return "We have a quite a lot of products that help \
            with you day to day life.\
            Products\
            Selen's Sword\
            Ikki's Ito Shura\
            Stella vermimllion's Laevatin\
            Light yagami's Death Note\
            Katagaki's Creator Glove\
            You can visit www.RecklessProducts.com \
            to View more of these"
        case 2:
        case 3:
            return `case two and three`
        default:
            return ` this must not be occuring`
    }
}

function replyText(msg){
    return {text:msg}
}



module.exports={
    Operator,
    defaultBotMessage,
    Client,
    processBotMessage,
    replyText,
}