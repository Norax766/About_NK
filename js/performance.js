function setPerformance(mode){

  const profileEffect =
    document.getElementById("profile-effect");

  const bannerEffect =
    document.querySelector(".banner-effect");

  const avatarDeco =
    document.querySelector(".avatar-decoration");

  const video =
    document.querySelector(".bg-video");

  if(mode === "low"){

    profileEffect.style.display = "none";
    bannerEffect.style.display = "none";
    avatarDeco.style.display = "none";

    document.body.style.animationDuration = "50s";

    video.style.filter =
      "blur(1px) brightness(0.5)";

    video.playbackRate = 0.7;

  } else {

    profileEffect.style.display = "block";
    bannerEffect.style.display = "block";
    avatarDeco.style.display = "block";

    document.body.style.animationDuration = "15s";

    video.style.filter =
      "blur(2px) brightness(0.7)";

    video.playbackRate = 1;
  }

  localStorage.setItem("perf", mode);
}