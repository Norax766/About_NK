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

}

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
