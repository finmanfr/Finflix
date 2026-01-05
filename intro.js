const video = document.getElementById("introVideo");
const unmuteBtn = document.getElementById("unmute-btn");
const intro = document.getElementById("intro-container");
const main = document.getElementById("main-content");

function endIntro() {
  intro.style.display = "none";
  main.style.display = "block";
}

// Unmute
unmuteBtn.onclick = () => {
  video.muted = false;
  video.volume = 1;
  video.play();
  unmuteBtn.style.display = "none";
};

// When video ends → same as skip
video.onended = endIntro;
