
  const video = document.getElementById("introVideo");

const unmuteBtn = document.getElementById("unmute-btn");

unmuteBtn.onclick = () => {
  video.muted = false;
  video.volume = 1;
  video.play(); // required for Safari/mobile
  unmuteBtn.style.display = "none";
};
