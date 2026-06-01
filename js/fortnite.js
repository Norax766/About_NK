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

    eacWindow.classList.remove(
        "hidden"
    );

    eacText.textContent =
    "Inicializando juego...";

    setTimeout(()=>{

        eacText.textContent =
        "Esperando al servidor...";

    },3000);

    setTimeout(()=>{

        eacWindow.classList.add(
            "hidden"
        );

        document.documentElement
        .requestFullscreen()
        .catch(()=>{});

        launcherScreen.classList.remove(
            "hidden"
        );

    },6000);

}
