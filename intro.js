document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("introVideo");
  const unmuteBtn = document.getElementById("unmute-btn");

  unmuteBtn.addEventListener("click", () => {
    video.muted = false;
    video.volume = 1;
    video.play(); // important for Safari/iOS
    unmuteBtn.style.display = "none";
  });
});
