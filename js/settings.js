let settingsPanel;

window.addEventListener("DOMContentLoaded", ()=>{

  settingsPanel =
    document.getElementById("settings-panel");

  if(!settingsPanel) return;

  settingsPanel.addEventListener("click", (e)=>{

    if(e.target.id === "settings-panel"){

      settingsPanel.classList.remove("active");
    }
  });
});

function openSettings(){

  if(!settingsPanel){

    settingsPanel =
      document.getElementById("settings-panel");
  }

  if(settingsPanel){

    settingsPanel.classList.add("active");
  }
}

function openSubTab(id){

  document.querySelectorAll(".tab")
    .forEach(t=>t.classList.remove("active"));

  document.querySelectorAll(".subtab")
    .forEach(s=>s.classList.remove("active"));

  const target =
    document.getElementById("sub-" + id);

  if(target){

    target.classList.add("active");
  }
}