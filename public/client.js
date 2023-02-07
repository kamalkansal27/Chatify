const socket = io()
let name;
let messageInp = document.querySelector('#messageInp')
let container = document.querySelector('.container')

do {
    name = prompt('Please Enter Your Name')
} while (!name);

messageInp.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value) 
    }
})

function sendMessage(message){
    let msg = {
        user : name,
        message : message.trim()
    }
    appendmessage(msg, 'right');
    messageInp.value = ""
    scrolltobottom();
    socket.emit('sendmessage', msg);
}
 
function appendmessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className, 'message');
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    container.appendChild(mainDiv)
}

// Receive

socket.on('message', (msg) =>{
    console.log(msg);
    appendmessage(msg, 'left');
    scrolltobottom();
})

function scrolltobottom(){
    container.scrollTop = container.scrollHeight
}