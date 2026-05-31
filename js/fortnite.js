const desktop = document.getElementById("desktop");
const eac = document.getElementById("eac");
const fortnite = document.getElementById("fortnite");

const icon = document.getElementById("fortnite-icon");
const eacText = document.getElementById("eac-text");

const bar = document.getElementById("bar");
const loginBar = document.getElementById("login-bar");

const loginPanel = document.getElementById("login-panel");
const startBtn = document.getElementById("start-btn");

const music = document.getElementById("music");

let username = localStorage.getItem("username");

if(!username){
  username = prompt("Nombre de usuario:");
  localStorage.setItem("username", username);
}

document.getElementById(
  "user-info"
).innerHTML =
"Iniciando sesión como:<br>" + username;

icon.addEventListener("dblclick", startLauncher);

function startLauncher(){

  music.play().catch(()=>{});

  desktop.classList.add("hidden");
  eac.classList.remove("hidden");

  setTimeout(()=>{
    eacText.textContent =
      "Esperando al servidor...";
  },3000);

  setTimeout(()=>{
    eac.classList.add("hidden");
    fortnite.classList.remove("hidden");

    loadBar(bar,3000,()=>{
      loginPanel.classList.remove("hidden");

      loadBar(loginBar,4000,()=>{
        startBtn.classList.remove("hidden");
      });
    });

  },6000);
}

function loadBar(element,time,callback){

  let width=0;

  const interval=setInterval(()=>{

    width++;

    element.style.width=width+"%";

    if(width>=100){
      clearInterval(interval);

      if(callback) callback();

    }

  },time/100);
}

startBtn.addEventListener("click",()=>{

  startBtn.textContent =
    "Iniciando Fortnite...";

  const ua =
    navigator.userAgent.toLowerCase();

  if(ua.includes("android")){
    window.location.href =
      "https://www.fortnite.com/mobile";
  }else{
    window.location.href =
      "https://www.fortnite.com/";
  }

});
