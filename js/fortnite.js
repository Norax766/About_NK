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

const eacWindow =
document.getElementById("eac-window");

function openEAC(){

    eacWindow.classList.remove(
        "hidden"
    );

}

if(
/android|iphone|ipad/i
.test(navigator.userAgent)
){

    fortniteIcon.addEventListener(
        "click",
        openEAC
    );

}else{

    fortniteIcon.addEventListener(
        "dblclick",
        openEAC
    );

}
