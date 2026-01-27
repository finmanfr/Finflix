/* =========================
   FINFLIX THEATER MODE
   ========================= */

// ----- STATE -----
let theaterOpen = false;
let cycleIndex = 0;
let originalMovieSrc = null;

// iframe sources you asked for
const cycleSources = [
  "https://www.youtube.com/embed/videoseries?list=PLQn122p5FtqKWAKseY3k3zdU7Bo6hQjy1&autoplay=1&mute=0",
  "https://www.youtube.com/embed/saPd1ahi-MY?controls=0&autoplay=1",
  "https://www.youtube.com/embed/videoseries?list=PLh2QSchbA3pmzTYulmz95bcBKXrK2sSA0&autoplay=1&mute=0"
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
      src="${src}"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        border: 0;
      "
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowfullscreen>
    </iframe>
  `;
}
function requestFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
}

function openTheater() {
  theaterOpen = true;
  theater.style.display = "block";
  normalPlayer.style.display = "none";
    document.body.classList.add("hide-cursor");
     requestFullscreen();
}

function closeTheater() {
  theaterOpen = false;
  theater.style.display = "none";
  theaterPlayer.innerHTML = "";
  document.body.classList.remove("hide-cursor");
}


// ----- KEY HANDLING -----
// =========================
// KEY HANDLING (CLEAN)
// =========================

const keys = {};
let comboUsed = false;

window.addEventListener(
  "keydown",
  (e) => {
    const key = e.key.toLowerCase();
    keys[key] = true;

    // STOP YouTube from stealing keys
    if (theaterOpen && (key === "s" || key === "p" || key === "t")) {
      e.preventDefault();
      e.stopPropagation();
    }

    // T → toggle theater
    if (key === "t") {
      theaterOpen ? closeTheater() : openTheater();
    }

    // S + P → cycle
    if (theaterOpen && keys["s"] && keys["p"] && !comboUsed) {
      comboUsed = true;
      cycleIndex++;

      if (cycleIndex < cycleSources.length) {
        loadTheaterIframe(cycleSources[cycleIndex]);
      } else {
        loadTheaterIframe(originalMovieSrc);
        cycleIndex = -1;
      }
    }

    // ESC → exit
    if (key === "escape" && theaterOpen) {
      closeTheater();
    }
  },
  true // 👈 CAPTURE PHASE (THIS IS THE MAGIC)
);

window.addEventListener(
  "keyup",
  (e) => {
    const key = e.key.toLowerCase();
    keys[key] = false;

    if (key === "s" || key === "p") {
      comboUsed = false;
    }
  },
  true
);



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
