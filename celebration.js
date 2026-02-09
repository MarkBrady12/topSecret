// --- CONFIGURATION AREA ---
const YOUTUBE_ID = "0K3M_u99IsY"; // REPLACE with your YouTube Video ID (the part after v=)
const GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmo3c3l5ODh3ZGN6NHhhaDE2Mjg1ZjkwOXczdDFxbWM3dTBtaW9zaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9XY4f3FgFTT4QlaYqa/giphy.gif", // Your current cat gif
  "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif", // Irish dance
  "https://media.giphy.com/media/3o6Zt7kFJmNQ8jQx4k/giphy.gif", // Shamrock
  "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif", // Confetti
  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"  // Party
];
// --------------------------

let player;
const chaos = document.getElementById("chaos");
const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("setupOverlay");

// 1. YouTube API setup
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: YOUTUBE_ID,
    playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': YOUTUBE_ID },
    events: { 'onReady': onPlayerReady }
  });
}

function onPlayerReady(event) {
  // Player is ready, but we wait for the click to play
}

// 2. The Chaos Trigger
startBtn.addEventListener("click", () => {
    overlay.style.display = "none"; // Hide the button
    
    // Start Music & Force Volume
    if (player) {
        player.playVideo();
        player.setVolume(100); // Forces volume to 100%
    }
    
    startChaos();
    document.body.classList.add("flash-green");
});

function rand(min, max) { return Math.random() * (max - min) + min; }

function spawnThing(src) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "thing";

  const size = rand(100, 300);
  const dur = rand(4, 10);
  const spin = rand(2, 5);

  const x0 = `${rand(-10, 110)}vw`;
  const y0 = `${rand(-10, 110)}vh`;
  const x1 = `${rand(-10, 110)}vw`;
  const y1 = `${rand(-10, 110)}vh`;

  img.style.setProperty("--size", `${size}px`);
  img.style.setProperty("--dur", `${dur}s`);
  img.style.setProperty("--spin", `${spin}s`);
  img.style.setProperty("--x0", x0);
  img.style.setProperty("--y0", y0);
  img.style.setProperty("--x1", x1);
  img.style.setProperty("--y1", y1);

  chaos.appendChild(img);
  setTimeout(() => img.remove(), 10000);
}

function startChaos() {
  // Initial burst
  for (let i = 0; i < 20; i++) {
    spawnThing(GIFS[Math.floor(Math.random() * GIFS.length)]);
  }

  // Continuous spawning
  setInterval(() => {
    spawnThing(GIFS[Math.floor(Math.random() * GIFS.length)]);
  }, 400);

  // Periodic color madness
  setInterval(() => {
    document.body.style.filter = `hue-rotate(${rand(0, 360)}deg) brightness(1.2)`;
    setTimeout(() => document.body.style.filter = "none", 200);
  }, 2000);
}
