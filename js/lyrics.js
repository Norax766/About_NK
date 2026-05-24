let translatedLyrics = [];
let isTranslated = false;
let lyrics = [];

async function loadLyrics(){

  const res = await fetch(
    "audio/Desconexion Emocional/Desconexion Emocional.lrc"
  );

  const text = await res.text();

  const lines = text.split("\n");

  lyrics = lines.map(line=>{

    const match =
      line.match(/\[(\d+):(\d+)(?:\.(\d+))?\]/);

    if(!match) return null;

    return {

      time:
        parseInt(match[1])*60 +
        parseInt(match[2]) +
        (match[3]
          ? parseInt(match[3])/100
          : 0),

      text: line
        .replace(/\[.*?\]/g, "")
        .replace(/<.*?>/g, "")
        .trim()
    };

  }).filter(l => l && l.text && !l.text.includes("www"));

  renderLyrics();
}

function renderLyrics(){

  const box =
    document.getElementById("lyrics-box");

  box.innerHTML = "";

  const source =
    isTranslated
      ? translatedLyrics
      : lyrics;

  source.forEach((l,i)=>{

    const div =
      document.createElement("div");

    div.classList.add("lyrics-line");

    div.textContent = l.text;

    div.id = "line-" + i;

    box.appendChild(div);
  });
}

let lastIndex = -1;

function updateLyrics(){

  if(!panel.classList.contains("active")) return;

  const t = music.currentTime;

  for(let i=0;i<lyrics.length;i++){

    if(t >= lyrics[i].time && i !== lastIndex){

      lastIndex = i;

      document.querySelectorAll(".lyrics-line")
        .forEach(el=>el.classList.remove("active"));

      const active =
        document.getElementById("line-"+i);

      if(active){

        active.classList.add("active");

        const box =
          document.getElementById("lyrics-box");

        box.scrollTop =
          active.offsetTop -
          box.clientHeight / 2;
      }
    }
  }
}

music.addEventListener(
  "timeupdate",
  updateLyrics
);

loadLyrics().then(async ()=>{

  await translateLyricsFast();

  if(userLang !== "en"){
    isTranslated = true;
  }

  renderLyrics();
});