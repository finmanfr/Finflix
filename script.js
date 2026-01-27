/* =========================
   FINFLIX THEATER MODE
   ========================= */

// ----- STATE -----
let theaterOpen = false;
let cycleIndex = 0;
let originalMovieSrc = null;

// iframe sources you asked for
const cycleSources = [
  "https://www.youtube.com/embed/videoseries?list=PLQn122p5FtqKWAKseY3k3zdU7Bo6hQjy1&autoplay=1&mute=1",
  "https://www.youtube.com/embed/saPd1ahi-MY?controls=0",
  "https://www.youtube.com/embed/videoseries?list=PLh2QSchbA3pmzTYulmz95bcBKXrK2sSA0&autoplay=1&mute=1"
];

// ----- ELEMENTS -----
const theater = document.getElementById("theater");
const movieList = document.getElementById("movie-list");
const theaterPlayer = document.getElementById("theater-player");
const normalPlayer = document.getElementById("player");
const normalIframe = document.getElementById("iframe");

// ----- BUILD MOVIE LIST FROM EXISTING CARDS -----
document.querySelectorAll(".card").forEach(card => {
  const title = card.dataset.title || "Untitled";
  const srcMatch = card.getAttribute("onclick")?.match(/'(.*?)'/);
  const src = srcMatch ? srcMatch[1] : null;

  const item = document.createElement("div");
  item.className = "movie";
  item.textContent = title;

  item.onclick = () => {
    if (!src) return;
    originalMovieSrc = src;
    cycleIndex = 0;
    loadTheaterIframe(cycleSources[0]);
  };

  movieList.appendChild(item);
});

// ----- FUNCTIONS -----
function loadTheaterIframe(src) {
  theaterPlayer.innerHTML = `
    <iframe
      width="1000"
      height="700"
      src="${src}"
      frameborder="0"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowfullscreen>
    </iframe>
  `;
}

function openTheater() {
  theaterOpen = true;
  theater.style.display = "block";
  normalPlayer.style.display = "none";
}

function closeTheater() {
  theaterOpen = false;
  theater.style.display = "none";
  theaterPlayer.innerHTML = "";
}

// ----- KEY HANDLING -----
const keys = {};

document.addEventListener("keydown", e => {
  keys[e.key.toLowerCase()] = true;

  // T → toggle theater mode
  if (e.key.toLowerCase() === "t") {
    theaterOpen ? closeTheater() : openTheater();
  }

  // S + K → cycle iframe sources
  if (keys["s"] && keys["k"] && theaterOpen) {
    cycleIndex++;

    if (cycleIndex < cycleSources.length) {
      loadTheaterIframe(cycleSources[cycleIndex]);
    } else {
      // back to original movie
      loadTheaterIframe(originalMovieSrc);
      cycleIndex = -1;
    }
  }

  // ESC → exit theater
  if (e.key === "Escape" && theaterOpen) {
    closeTheater();
  }
});

document.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

// ----- OVERRIDE NORMAL PLAY WHEN THEATER IS OPEN -----
window.playVideo = function (src) {
  if (theaterOpen) {
    originalMovieSrc = src;
    cycleIndex = 0;
    loadTheaterIframe(cycleSources[0]);
    return;
  }

  normalIframe.src = src;
  normalPlayer.style.display = "flex";
};
