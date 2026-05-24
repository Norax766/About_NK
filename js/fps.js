const fpsDisplay =
  document.getElementById("fps-counter");

let lastTime = performance.now();

let frames = 0;

function updateFPS(){

  const now = performance.now();

  frames++;

  if(now >= lastTime + 1000){

    const fps = frames;

    fpsDisplay.textContent = "FPS: " + fps;

    fpsDisplay.classList.remove(
      "fps-green",
      "fps-orange",
      "fps-red"
    );

    if(fps >= 40){

      fpsDisplay.classList.add("fps-green");

    } else if(fps >= 31){

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