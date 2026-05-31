const desktopScreen = document.getElementById("desktop-screen");
const eacScreen = document.getElementById("eac-screen");
const blackScreen1 = document.getElementById("black-screen-1");
const connectingScreen = document.getElementById("connecting-screen");
const blackScreen2 = document.getElementById("black-screen-2");
const loginScreen = document.getElementById("login-screen");
const startScreen = document.getElementById("start-screen");
const launchScreen = document.getElementById("launch-screen");

const fortniteShortcut =
document.getElementById("fortnite-shortcut");

const eacStatus =
document.getElementById("eac-status");

const usernameDisplay =
document.getElementById("username-display");

const connectingProgress =
document.getElementById("connecting-progress");

const loginProgress =
document.getElementById("login-progress");

const startButton =
document.getElementById("start-button");

const fortniteMusic =
document.getElementById("fortnite-music");

/* ====================== */
/* HORA WINDOWS */
/* ====================== */

const clockTime =
document.getElementById("clock-time");

const clockDate =
document.getElementById("clock-date");

function updateClock(){

    const now = new Date();

    clockTime.textContent =
    now.toLocaleTimeString("es-MX",{
        hour:"2-digit",
        minute:"2-digit"
    });

    clockDate.textContent =
    now.toLocaleDateString("es-MX");
}

updateClock();

setInterval(updateClock,1000);

/* ====================== */
/* USUARIO */
/* ====================== */

let username =
localStorage.getItem("fortnite_user");

if(!username){

    username =
    prompt("Ingresa tu nombre de usuario:");

    if(!username){
        username = "Jugador";
    }

    localStorage.setItem(
        "fortnite_user",
        username
    );
}

usernameDisplay.textContent =
username;

/* ====================== */
/* UTILIDAD */
/* ====================== */

function hideAll(){

    desktopScreen.classList.add("hidden");
    eacScreen.classList.add("hidden");
    blackScreen1.classList.add("hidden");
    connectingScreen.classList.add("hidden");
    blackScreen2.classList.add("hidden");
    loginScreen.classList.add("hidden");
    startScreen.classList.add("hidden");
    launchScreen.classList.add("hidden");
}

/* ====================== */
/* BARRAS */
/* ====================== */

function animateProgress(
    element,
    duration,
    callback
){

    let progress = 0;

    const interval =
    setInterval(()=>{

        progress++;

        element.style.width =
        progress + "%";

        if(progress >= 100){

            clearInterval(interval);

            if(callback){
                callback();
            }
        }

    }, duration / 100);

}

/* ====================== */
/* FULLSCREEN */
/* ====================== */

function enterFullscreen(){

    if(document.documentElement.requestFullscreen){

        document.documentElement
        .requestFullscreen()
        .catch(()=>{});

    }

}

/* ====================== */
/* SECUENCIA */
/* ====================== */

function startFortnite(){

    enterFullscreen();

    hideAll();

    eacScreen.classList.remove("hidden");

    setTimeout(()=>{

        eacStatus.textContent =
        "Verificando archivos...";

    },2000);

    setTimeout(()=>{

        eacStatus.textContent =
        "Esperando al servidor...";

    },4000);

    setTimeout(()=>{

        hideAll();

        blackScreen1.classList.remove(
            "hidden"
        );

    },6000);

    setTimeout(()=>{

        hideAll();

        connectingScreen.classList.remove(
            "hidden"
        );

        fortniteMusic.play()
        .catch(()=>{});

        animateProgress(
            connectingProgress,
            5000,
            ()=>{}
        );

    },9000);

    setTimeout(()=>{

        hideAll();

        blackScreen2.classList.remove(
            "hidden"
        );

    },14000);

    setTimeout(()=>{

        hideAll();

        loginScreen.classList.remove(
            "hidden"
        );

        animateProgress(
            loginProgress,
            5000,
            ()=>{

                hideAll();

                startScreen.classList.remove(
                    "hidden"
                );

            }
        );

    },15000);

}

/* ====================== */
/* ABRIR */
/* ====================== */

fortniteShortcut.addEventListener(
    "click",
    startFortnite
);

/* ====================== */
/* START */
/* ====================== */

startButton.addEventListener(
    "click",
    ()=>{

        hideAll();

        launchScreen.classList.remove(
            "hidden"
        );

        const ua =
        navigator.userAgent.toLowerCase();

        setTimeout(()=>{

            if(ua.includes("android")){

                window.open(
                    "https://www.fortnite.com/mobile",
                    "_blank"
                );

            }else{

                window.open(
                    "https://www.fortnite.com/",
                    "_blank"
                );

            }

        },2500);

    }
);
