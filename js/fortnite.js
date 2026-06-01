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
