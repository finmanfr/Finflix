document.addEventListener(
  "click",
  () => {
    video.muted = false;
    video.volume = 1;
  },
  { once: true }
);
