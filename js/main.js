const supportedLangs = ["es","en","pt","fr","it","de"];

let userLang = (
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language
).slice(0,2);

if(!supportedLangs.includes(userLang)){
  userLang = "en"; // fallback
}

const music = document.getElementById("music");
const overlay = document.getElementById("overlay");
const panel = document.getElementById("music-panel");

const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

let isDragging = false;

// 🎬 START
overlay.onclick = () => {
  overlay.style.opacity = "0";
  setTimeout(()=> overlay.style.display="none",500);

  music.volume = 0.5;
  music.play();
};

// 🎵 abrir panel
function openPlayer(){
  panel.classList.add("active");
  document.body.classList.add("no-scroll");

  const video = document.querySelector(".bg-video");
  if(video) video.play();
}

//Cerrar panel haciendo click fuera
panel.onclick = (e)=>{
  if(e.target.id === "music-panel"){
    panel.classList.remove("active");
    document.body.classList.remove("no-scroll");

    const video = document.querySelector(".bg-video");
    if(video) video.pause();
  }
};


// ⏱ CUANDO YA CARGA LA CANCIÓN
music.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(music.duration);
});

// 🔄 ACTUALIZAR PROGRESO
music.addEventListener("timeupdate", () => {
  if (!music.duration || isDragging) return;

  const percent = (music.currentTime / music.duration) * 100;
  progress.style.width = percent + "%";

  current.textContent = formatTime(music.currentTime);
});

// 🖱 DRAG REAL
progressContainer.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = progressContainer.getBoundingClientRect();
  let x = e.clientX - rect.left;

  x = Math.max(0, Math.min(x, rect.width));

  const percent = x / rect.width;
  progress.style.width = (percent * 100) + "%";

  music.currentTime = percent * music.duration;
});

// 📱 soporte táctil
progressContainer.addEventListener("touchstart", () => isDragging = true);

document.addEventListener("touchend", () => isDragging = false);

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const rect = progressContainer.getBoundingClientRect();
  let x = e.touches[0].clientX - rect.left;

  x = Math.max(0, Math.min(x, rect.width));

  const percent = x / rect.width;
  progress.style.width = (percent * 100) + "%";

  music.currentTime = percent * music.duration;
});

// 🧠 formato tiempo
function formatTime(t){
  if (isNaN(t)) return "0:00";

  const m = Math.floor(t/60);
  const s = Math.floor(t%60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}

let translatedLyrics = [];
let isTranslated = false;
let lyrics = [];

// cargar .lrc
async function loadLyrics(){
  const res = await fetch("EL ARCHIVO .lrc AQUI");
  const text = await res.text();

  const lines = text.split("\n");

  lyrics = lines.map(line=>{
    const match = line.match(/\[(\d+):(\d+)(?:\.(\d+))?\]/);
    if(!match) return null;

    return {
      time: parseInt(match[1])*60 + parseInt(match[2]) + (match[3]? parseInt(match[3])/100:0),
      text: line
  .replace(/\[.*?\]/g, "")   // quita [00:00]
  .replace(/<.*?>/g, "")     // quita <00:00.00>
  .trim()

    };
  }).filter(l => l && l.text && !l.text.includes("www"));

  renderLyrics();
}

// pintar líneas
function renderLyrics(){
  const box = document.getElementById("lyrics-box");
  box.innerHTML = "";

  const source = isTranslated ? translatedLyrics : lyrics;

  source.forEach((l,i)=>{
    const div = document.createElement("div");
    div.classList.add("lyrics-line");
    div.textContent = l.text;
    div.id = "line-" + i;
    box.appendChild(div);
  });
}

// sincronizar
let lastIndex = -1;

function updateLyrics(){

  if(!panel.classList.contains("active")) return;

  const t = music.currentTime;

  for(let i=0;i<lyrics.length;i++){
    if(t >= lyrics[i].time && i !== lastIndex){

      lastIndex = i;

      document.querySelectorAll(".lyrics-line")
        .forEach(el=>el.classList.remove("active"));

      const active = document.getElementById("line-"+i);

      if(active){
        active.classList.add("active");

        const box = document.getElementById("lyrics-box");

        box.scrollTop =
          active.offsetTop - box.clientHeight / 2;
      }
    }
  }
}

// conectar con el tiempo
music.addEventListener("timeupdate", updateLyrics);

loadLyrics().then(async () => {

  await translateLyricsFast();

  // activar automáticamente si no es español
  if(userLang !== "en"){
    isTranslated = true;
  }

  renderLyrics();
});

const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume");

// cargar volumen guardado
const savedVolume = localStorage.getItem("volume");
if(savedVolume !== null){
  music.volume = savedVolume;
  volumeSlider.value = savedVolume;
} else {
  music.volume = 0.5;
  volumeSlider.value = 0.5;
}

// cambiar volumen
volumeSlider.addEventListener("input", ()=>{
  music.volume = volumeSlider.value;
  localStorage.setItem("volume", volumeSlider.value);
});

// toggle play/pause
function toggleMusic(){
  if(music.paused){
    music.play();
    playBtn.textContent = "⏸️";
  } else {
    music.pause();
    playBtn.textContent = "▶️";
  }
          }

function seek(e){
  const rect = progressContainer.getBoundingClientRect();
  let x = e.clientX - rect.left;

  x = Math.max(0, Math.min(x, rect.width));

  const percent = x / rect.width;

  music.currentTime = percent * music.duration;
  progress.style.width = (percent * 100) + "%";
                                                        }
  
 const fpsDisplay = document.getElementById("fps-counter");

let lastTime = performance.now();
let frames = 0;

function updateFPS(){
  const now = performance.now();
  frames++;

  if (now >= lastTime + 1000) {
    const fps = frames;

    fpsDisplay.textContent = "FPS: " + fps;

    fpsDisplay.classList.remove("fps-green", "fps-orange", "fps-red");

    if (fps >= 40) {
      fpsDisplay.classList.add("fps-green");
    } else if (fps >= 31) { // 👈 corregido
      fpsDisplay.classList.add("fps-orange");
    } else {
      fpsDisplay.classList.add("fps-red");
    }

    frames = 0;
    lastTime = now;
  }

  requestAnimationFrame(updateFPS);
}

updateFPS();

//Lyrics translated//

async function translateLyricsFast(){

  if(userLang === "en"){
    translatedLyrics = [...lyrics];
    return;
  }

  try{

    // 🔹 unir todo
    const fullText = lyrics.map(l => l.text).join(" ||| ");

    // 🔹 dividir en bloques de máximo 400 chars (seguro)
    const chunks = [];
    let current = "";

    fullText.split(" ").forEach(word => {
      if((current + word).length > 400){
        chunks.push(current);
        current = word + " ";
      } else {
        current += word + " ";
      }
    });

    if(current) chunks.push(current);

    // 🔹 traducir cada bloque
    let translatedText = "";

    for(const chunk of chunks){
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=`
      );

      const data = await res.json();
      translatedText += data.responseData.translatedText + " ";
    }

    // 🔹 reconstruir líneas
    const translated = translatedText.split(" ||| ");

    translatedLyrics = lyrics.map((l,i)=>({
      time: l.time,
      text: translated[i] || l.text
    }));

  }catch{
    translatedLyrics = [...lyrics];
  }
}

async function toggleTranslate(){

  const btn = document.getElementById("translate-btn");

  if(!isTranslated){

    btn.textContent = "Traduciendo...";

    if(translatedLyrics.length === 0){
      await translateLyrics();
    }

    isTranslated = true;
    btn.textContent = "🌐 Original (ES)";

  } else {

    isTranslated = false;
    btn.textContent = "🌐 Traducir (EN)";
  }

  renderLyrics();
}

function getTextNodes(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;

        const parent = node.parentElement;

        // ❌ ignorar cosas problemáticas
        if (
          parent.closest("script, style, noscript") ||
          parent.closest("#lyrics-box") || // 👈 NO tocar lyrics
          parent.closest(".time") ||
          parent.closest("button") // opcional
        ) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  let nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  return nodes;
}

async function translatePageAuto() {
  if (userLang === "es") return; // ya está en español

  const nodes = getTextNodes(document.body);

  let chunk = [];
  let totalLength = 0;

  for (let node of nodes) {

    const text = node.nodeValue.trim();

    // evitar textos muy cortos tipo símbolos
    if (text.length < 2) continue;

    if (totalLength + text.length > 400) {
      await translateChunk(chunk);
      chunk = [];
      totalLength = 0;
    }

    chunk.push(node);
    totalLength += text.length;
  }

  if (chunk.length > 0) {
    await translateChunk(chunk);
  }
}

async function translateChunk(nodes) {

  const text = nodes.map(n => n.nodeValue).join(" || ");

  const res = await fetch(
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" 
    + userLang + "&dt=t&q=" + encodeURIComponent(text)
  );

  const data = await res.json();

  const translated = data[0].map(t => t[0]).join("").split(" || ");

  nodes.forEach((node, i) => {
    if (translated[i]) {
      node.nodeValue = translated[i];
    }
  });
}

window.addEventListener("load", () => {
  translatePageAuto();
});

// INFO DISCORD //
const discordModal =
  document.getElementById("discord-modal");

function openDiscordModal(){

  discordModal.classList.add("active");

}

discordModal.addEventListener("click",(e)=>{

  if(e.target.id === "discord-modal"){

    discordModal.classList.remove("active");

  }

});
