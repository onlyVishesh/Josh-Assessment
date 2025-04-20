// Video functionality
const video = document.getElementById("feature-video");
const playButton = document.querySelector(".play-button");

playButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.style.display = "none";
  } else {
    video.pause();
    playButton.style.display = "flex";
  }
});

video.addEventListener("play", () => {
  playButton.style.display = "none";
});

video.addEventListener("pause", () => {
  playButton.style.display = "flex";
});
