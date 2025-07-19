const MOVIES = [
  {
    title: "MyMovie1",
    poster: "media/MyMovie1/poster.jpg",
    video: "media/MyMovie1/video.mp4"
  },
  {
    title: "MyMovie2",
    poster: "media/MyMovie2/poster.jpg",
    video: "media/MyMovie2/video.mp4"
  }
];

const grid = document.getElementById("movie-grid");

MOVIES.forEach(movie => {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `<img src="${movie.poster}" alt="${movie.title}" title="${movie.title}">`;
  card.onclick = () => playMovie(movie.video);
  grid.appendChild(card);
});

function playMovie(videoPath) {
  const player = document.getElementById("player");
  const video = document.getElementById("movie-player");
  video.src = videoPath;
  player.style.display = "flex";
}

function closePlayer() {
  const player = document.getElementById("player");
  const video = document.getElementById("movie-player");
  video.pause();
  video.src = "";
  player.style.display = "none";
}
