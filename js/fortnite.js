const time =
document.getElementById("time");

const date =
document.getElementById("date");

function updateClock(){

    const now = new Date();

    time.textContent =
    now.toLocaleTimeString(
        "es-MX",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );

    date.textContent =
    now.toLocaleDateString(
        "es-MX"
    );

}

updateClock();

setInterval(updateClock,1000);

const fortniteIcon =
document.getElementById("fortnite-icon");

const launcherScreen =
document.getElementById("launcher-screen");

const launcherText =
document.getElementById("launcher-text");
const blackScreen =
document.getElementById("black-screen");

const connectingScreen =
document.getElementById("connecting-screen");

const progressFill =
document.getElementById("progress-fill");

const loginScreen =
document.getElementById("login-screen");

const loginProgressFill =
document.getElementById("login-progress-fill");

const music =
document.getElementById("fortnite-music");

music.loop = true;

const startButton =
document.getElementById("start-button");

function startLauncher(){

    launcherScreen.classList.remove(
        "hidden"
    );

    launcherText.textContent =
    "Inicializando juego...";

    setTimeout(()=>{

        launcherText.textContent =
        "Esperando al servidor...";

    },3000);

    setTimeout(()=>{

        launcherScreen.classList.add(
            "hidden"
        );

        blackScreen.classList.remove(
            "hidden"
        );

    },6000);

    setTimeout(()=>{

    blackScreen.classList.add(
        "hidden"
    );

    connectingScreen.classList.remove(
        "hidden"
    );

    music.volume = 1;

    music.play().catch(error=>{
        console.log(error);
    });

    startProgress();

    },9000);

}

function startProgress(){

    let progress = 0;

    const timer = setInterval(()=>{

        progress++;

        progressFill.style.width =
        progress + "%";

        if(progress >= 100){

            clearInterval(timer);

            setTimeout(()=>{

                connectingScreen.classList.add(
                    "hidden"
                );

                blackScreen.classList.remove(
                    "hidden"
                );

                setTimeout(()=>{

                    blackScreen.classList.add(
                        "hidden"
                    );

                    loginScreen.classList.remove(
                        "hidden"
                    );

                    startLoginProgress();

                },1000);

            },500);

        }

    },50);

}

function startLoginProgress(){

    let progress = 0;

    const timer = setInterval(()=>{

        progress++;

        loginProgressFill.style.width =
        progress + "%";

        if(progress >= 100){

    clearInterval(timer);

    document.querySelector(
        "#login-center h2"
    ).style.display = "none";

    document.getElementById(
        "login-progress-bar"
    ).style.display = "none";

    startButton.classList.remove(
        "hidden"
    );

}

    },50);

}

startButton.addEventListener(
    "click",
    ()=>{

        startButton.textContent =
        "Iniciando Fortnite...";

        const ua =
        navigator.userAgent.toLowerCase();

        if(
            ua.includes("android")
        ){

            window.open(
                "https://www.fortnite.com/mobile",
                "_blank"
            );

        }else{

            window.open(
                "https://www.fortnite.com/download",
                "_blank"
            );

        }

    }
);

if(
/android|iphone|ipad/i
.test(navigator.userAgent)
){

    fortniteIcon.addEventListener(
        "click",
        startLauncher
    );

}else{

    fortniteIcon.addEventListener(
        "dblclick",
        startLauncher
    );

}
