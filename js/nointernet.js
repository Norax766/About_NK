const offlineOverlay =
  document.getElementById("offline-overlay");

const retryBtn =
  document.getElementById("retry-btn");


// 🌐 OFFLINE
function showOffline(){

  document.body.classList.add("offline");

  offlineOverlay.classList.add("active");

}


// 🌐 ONLINE
function hideOffline(){

  document.body.classList.remove("offline");

  offlineOverlay.classList.remove("active");

}


// detectar conexión
window.addEventListener("offline", ()=>{

  showOffline();

});


window.addEventListener("online", ()=>{

  hideOffline();

});


// estado inicial
if(!navigator.onLine){

  showOffline();

}


// botón retry
retryBtn.addEventListener("click", ()=>{

  if(navigator.onLine){

    hideOffline();

    location.reload();

  }else{

    retryBtn.textContent =
      "Sin conexión";

    setTimeout(()=>{

      retryBtn.textContent =
        "Reintentar";

    },1500);

  }

});