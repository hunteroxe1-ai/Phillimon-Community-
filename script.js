import { db, ref, push, onValue, transaction } from './firebase.js';

let selectedColor = "green";
let username = localStorage.getItem("username");

if(username){
  document.getElementById("usernameBox").style.display="none";
  document.getElementById("app").classList.remove("hidden");
}

function saveUsername(){
  username = document.getElementById("usernameInput").value;
  if(username){
    localStorage.setItem("username", username);
    location.reload();
  }
}

function setColor(c){ selectedColor = c; }

function addPost(){
  let text = document.getElementById("postText").value;
  if(!text) return;

  push(ref(db, "posts"), {
    user: username,
    text: text,
    color: selectedColor,
    likes: 0,
    time: Date.now()
  });

  document.getElementById("postText").value="";
}

function renderPosts(snapshot){
  let html="";
  snapshot.forEach(p=>{
    let d = p.val();
    html = `
    <div class="post ${d.color}">
      <b>${d.user}</b><br>${d.text}<br>
      ❤️ ${d.likes} <button onclick="likePost('${p.key}')">Like</button>
      <button onclick="toggleComments('${p.key}')">View comments</button>
      <div id="c${p.key}" class="hidden"></div>
    </div>` + html;
  });
  document.getElementById("posts").innerHTML=html;
}

onValue(ref(db,"posts"), snapshot=>{
  renderPosts(snapshot);
});

window.likePost = function(id){
  transaction(ref(db,"posts/"+id+"/likes"), l => (l||0)+1);
}

window.toggleComments = function(id){
  let box = document.getElementById("c"+id);
  box.classList.toggle("hidden");
  box.innerHTML = `
    <input id="ci${id}" placeholder="Comment">
    <button onclick="sendComment('${id}')">Send</button>
  `;
}

window.sendComment = function(id){
  let txt = document.getElementById("ci"+id).value;
  if(!txt) return;
  push(ref(db,"comments/"+id), {
    user: username,
    text: txt,
    time: Date.now()
  });
}
