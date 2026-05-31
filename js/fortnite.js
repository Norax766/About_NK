const desktop =
document.getElementById("desktop-screen");

const eac =
document.getElementById("eac-screen");

const black1 =
document.getElementById("black-screen-1");

const connecting =
document.getElementById("connecting-screen");

const black2 =
document.getElementById("black-screen-2");

const login =
document.getElementById("login-screen");

const start =
document.getElementById("start-screen");

const launch =
document.getElementById("launch-screen");

const shortcut =
document.getElementById("fortnite-shortcut");

const eacStatus =
document.getElementById("eac-status");

const connectingFill =
document.getElementById("connecting-fill");

const loginFill =
document.getElementById("login-fill");

const startButton =
document.getElementById("start-button");

const music =
document.getElementById("fortnite-music");

/* ========================= */
/* RELOJ */
/* ========================= */

const clockTime =
document.getElementById("clock-time");

const clockDate =
document.getElementById("clock-date");

function updateClock(){

    const now = new Date();

    clockTime.textContent =
    now.toLocaleTimeString(
        "es-MX",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );

    clockDate.textContent =
    now.toLocaleDateString(
        "es-MX"
    );
}

updateClock();

setInterval(updateClock,1000);

/* ========================= */
/* UTILIDAD */
/* ========================= */

function hideAll(){

    desktop.classList.add("hidden");
    eac.classList.add("hidden");
    black1.classList.add("hidden");
    connecting.classList.add("hidden");
    black2.classList.add("hidden");
    login.classList.add("hidden");
    start.classList.add("hidden");
    launch.classList.add("hidden");
}

function showScreen(screen){

    hideAll();

    screen.classList.remove("hidden");
}

function fullscreen(){

    if(
        document.documentElement
        .requestFullscreen
    ){
        document.documentElement
        .requestFullscreen()
        .catch(()=>{});
    }
}

/* ========================= */
/* BARRA */
/* ========================= */

function animateBar(
    element,
    duration,
    callback
){

    let progress = 0;

    element.style.width = "0%";

    const timer =
    setInterval(()=>{

        progress++;

        element.style.width =
        progress + "%";

        if(progress >= 100){

            clearInterval(timer);

            if(callback){
                callback();
            }

        }

    },duration / 100);

}

/* ========================= */
/* SECUENCIA */
/* ========================= */

function startFortnite(){

    fullscreen();

    showScreen(eac);

    eacStatus.textContent =
    "Inicializando juego...";

    setTimeout(()=>{

        eacStatus.textContent =
        "Esperando al servidor...";

    },3000);

    setTimeout(()=>{

        showScreen(black1);

    },6000);

    setTimeout(()=>{

        showScreen(connecting);

        music.play()
        .catch(()=>{});

        animateBar(
            connectingFill,
            5000,
            ()=>{}
        );

    },9000);

    setTimeout(()=>{

        showScreen(black2);

    },14000);

    setTimeout(()=>{

        showScreen(login);

        animateBar(
            loginFill,
            5000,
            ()=>{

                showScreen(start);

            }
        );

    },15000);

}

/* ========================= */
/* MOVIL */
/* ========================= */

if(
/android|iphone|ipad/i
.test(
navigator.userAgent
)
){

    shortcut.addEventListener(
        "click",
        startFortnite
    );

}else{

    shortcut.addEventListener(
        "dblclick",
        startFortnite
    );

}

/* ========================= */
/* BOTON START */
/* ========================= */

startButton.addEventListener(
    "click",
    ()=>{

        showScreen(launch);

        setTimeout(()=>{

            const ua =
            navigator.userAgent
            .toLowerCase();

            if(
                ua.includes(
                    "android"
                )
            ){

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
