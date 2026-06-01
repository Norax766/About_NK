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

const music =
document.getElementById("fortnite-music");

function startLauncher(){

    music.load();

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

        launcherScreen.classList.add("hidden");

        blackScreen.classList.remove("hidden");

    },6000);

    setTimeout(()=>{

        blackScreen.classList.add("hidden");

        connectingScreen.classList.remove("hidden");

        music.volume = 1;

        music.play().catch(err=>{
            console.log(err);
        });

        startProgress();

    },9000);

}


function startProgress(){

    let progress = 0;

    const timer =
    setInterval(()=>{

        progress++;

        progressFill.style.width =
        progress + "%";

        if(progress >= 100){

            clearInterval(timer);

        }

    },50);

}

