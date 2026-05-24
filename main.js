const supportedLangs = ["es","en","pt","fr","it","de"];

let userLang = (
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language
).slice(0,2);

if(!supportedLangs.includes(userLang)){
  userLang = "en";
}

const music = document.getElementById("music");
const overlay = document.getElementById("overlay");
const panel = document.getElementById("music-panel");

overlay.onclick = () => {
  overlay.style.opacity = "0";

  setTimeout(()=>{
    overlay.style.display = "none";
  },500);

  music.volume = 0.5;
  music.play();
};

window.addEventListener("load", () => {
  translatePageAuto();
});