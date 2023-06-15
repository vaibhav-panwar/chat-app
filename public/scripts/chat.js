const socket = io("http://localhost:8080", { transports: ["websocket"] });

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("username");
const roomname = urlParams.get("roomname");

socket.on("new-user-joined", (user) => {
    alert(`${user} has joined the room`)
})
socket.on("joined-user",(data)=>{  
    document.getElementById("users").innerHTML =""  
    data.forEach((user)=>{
        let p = document.createElement("p");
        p.innerText = `${user.user} has joined the room`
        document.getElementById("users").append(p);
    })

})
socket.on("recieve-msg",(data)=>{
    
    let a = createmsg(data.user, data.message);
    document.getElementById("msgBox").append(a);
})
socket.on("disconnected-user",(user)=>{
    let p = document.createElement("p");
    p.innerText = `${user.user} has disconnected`;
    document.getElementById("users").append(p);
})
document.getElementById("sendBtn").addEventListener("click",()=>{
    let data = {
        user:username,
        message:document.getElementById("msg").value
    }
    socket.emit("message",data);
    let a = createmsg(data.user,data.message);
    document.getElementById("msgBox").append(a);
})
function dataSend(){
    let data = {
        user:username,
        room:roomname
    }
    socket.emit("join-room", data);
}
window.onload = dataSend()

function createmsg(name,message){
    let a = document.createElement("div");
    let h1 = document.createElement("h3");
    h1.innerText = name;
    let p = document.createElement("p");
    p.innerText = message;
    a.append(h1,p);
    a.style.backgroundColor = "orange"
    return a
    
}
 

// socket.on("new-user-joined",(user)=>{
//     alert(`${user} has joined`)
// })