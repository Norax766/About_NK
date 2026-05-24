const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

let isDragging = false;

function openPlayer(){

  panel.classList.add("active");
  document.body.classList.add("no-scroll");

  const video = document.querySelector(".bg-video");

  if(video) video.play();
}

panel.onclick = (e)=>{

  if(e.target.id === "music-panel"){

    panel.classList.remove("active");
    document.body.classList.remove("no-scroll");

    const video = document.querySelector(".bg-video");

    if(video) video.pause();
  }
};

music.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(music.duration);
});

music.addEventListener("timeupdate", () => {

  if (!music.duration || isDragging) return;

  const percent =
    (music.currentTime / music.duration) * 100;

  progress.style.width = percent + "%";

  current.textContent =
    formatTime(music.currentTime);
});

function formatTime(t){

  if(isNaN(t)) return "0:00";

  const m = Math.floor(t/60);
  const s = Math.floor(t%60);

  return m + ":" + (s < 10 ? "0" : "") + s;
}

function seek(e){

  const rect =
    progressContainer.getBoundingClientRect();

  let x = e.clientX - rect.left;

  x = Math.max(0, Math.min(x, rect.width));

  const percent = x / rect.width;

  music.currentTime = percent * music.duration;

  progress.style.width =
    (percent * 100) + "%";
}