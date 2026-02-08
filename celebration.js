const chaos = document.getElementById("chaos");
const bgAudio = document.getElementById("bgAudio");
const musicBtn = document.getElementById("musicBtn");
const toYesBtn = document.getElementById("toYesBtn");
const sub = document.getElementById("sub");

// Swap these URLs for your favourites
const GIFS = [
  "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "https://media.giphy.com/media/3o6Zt7kFJmNQ8jQx4k/giphy.gif",
  "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
  "https://media.giphy.com/media/3oKIPsx2VAYAgEHC12/giphy.gif"
];

function r(min, max) { return Math.random() * (max - min) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function spawnAcrossScreen(src) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "thing";

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Choose an edge to spawn from
  const edge = Math.floor(r(0, 4)); // 0 top, 1 right, 2 bottom, 3 left
  const padding = 180; // spawn off-screen

  let x0, y0, x1, y1;

  if (edge === 0) { // top -> somewhere below
    x0 = r(-padding, vw + padding); y0 = -padding;
    x1 = r(-padding, vw + padding); y1 = vh + padding;
  } else if (edge === 1) { // right -> left
    x0 = vw + padding; y0 = r(-padding, vh + padding);
    x1 = -padding;     y1 = r(-padding, vh + padding);
  } else if (edge === 2) { // bottom -> top
    x0 = r(-padding, vw + padding); y0 = vh + padding;
    x1 = r(-padding, vw + padding); y1 = -padding;
  } else { // left -> right
    x0 = -padding; y0 = r(-padding, vh + padding);
    x1 = vw + padding; y1 = r(-padding, vh + padding);
  }

  const size = r(70, 240);
  const dur = r(4.5, 12);          // speed variability
  const spin = r(2.5, 10);         // rotation variability
  const bounce = r(0.6, 1.6);
  const opacity = r(0.75, 1);

  img.style.setProperty("--size", `${size}px`);
  img.style.setProperty("--dur", `${dur}s`);
  img.style.setProperty("--spin", `${spin}s`);
  img.style.setProperty("--bounce", `${bounce}s`);

  img.style.setProperty("--x0", `${x0}px`);
  img.style.setProperty("--y0", `${y0}px`);
  img.style.setProperty("--x1", `${x1}px`);
  img.style.setProperty("--y1", `${y1}px`);

  img.style.opacity = opacity;

  chaos.appendChild(img);
  setTimeout(() => img.remove(), (dur + 2) * 1000);
}

function startChaos() {
  // burst
  for (let i = 0; i < 14; i++) spawnAcrossScreen(pick(GIFS));

  // continuous
  setInterval(() => spawnAcrossScreen(pick(GIFS)), 350);

  // optional: occasional full-screen shake vibe
  setInterval(() => {
    document.body.style.transform = `translate(${r(-6, 6)}px, ${r(-6, 6)}px)`;
    setTimeout(() => (document.body.style.transform = ""), 120);
  }, 900);
}

// Try to play audio (works best when arriving via "Agree" click)
async function startTunes() {
  try {
    bgAudio.volume = 0.8;
    await bgAudio.play();
    musicBtn.textContent = "🎶 Tunes playing";
    if (sub) sub.textContent = "Trad tunes engaged. Chaos levels rising.";
  } catch (e) {
    // If blocked, user can still hit the button
    if (sub) sub.textContent = "Tap “Start the tunes” (browser rules 🙄).";
  }
}

musicBtn.addEventListener("click", startTunes);
toYesBtn.addEventListener("click", () => (window.location.href = "yes_page.html")); // :contentReference[oaicite:3]{index=3}

startChaos();
startTunes();
