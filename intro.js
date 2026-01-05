const unmuteBtn = document.getElementById("unmute-btn");
const video = document.getElementById("introVideo");
const intro = document.getElementById("intro-container");
const main = document.getElementById("main-content");

// End intro
function endIntro() {
  intro.style.display = "none";
  main.style.display = "block";
}

// Unmute button
unmuteBtn.onclick = () => {
  video.muted = false;
  video.volume = 1;
  video.play();
  unmuteBtn.style.display = "none";
};

// When video ends
video.onended = endIntro;
