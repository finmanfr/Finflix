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

<script>
const movies = [
  "K+K.png",
];

const row = document.getElementById("movie-row");

movies.forEach(icon => {
  const div = document.createElement("div");
  div.className = "movie";
  div.style.backgroundImage = `url(movies/icons/${icon})`;
  row.appendChild(div);
});
</script>
