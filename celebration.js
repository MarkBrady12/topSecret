const chaos = document.getElementById("chaos");
const bgAudio = document.getElementById("bgAudio");
const musicBtn = document.getElementById("musicBtn");
const toYesBtn = document.getElementById("toYesBtn");
const sub = document.getElementById("sub");

// Pick a few Irish-happy chaotic vibes (swap these URLs!)
const GIFS = [
  // Irish dancing / Riverdance vibe
  "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
  // Party / cheering
  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  // Shamrock / luck
  "https://media.giphy.com/media/3o6Zt7kFJmNQ8jQx4k/giphy.gif",
  // Confetti
  "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
  // Pint / cheers (lighthearted)
  "https://media.giphy.com/media/3oKIPsx2VAYAgEHC12/giphy.gif"
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnThing(src) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "thing";

  const size = rand(80, 220);
  const dur = rand(6, 14);
  const spin = rand(3, 10);
  const bounce = rand(0.8, 1.8);

  // Start + end points (some fly across screen, some bounce around)
  const x0 = `${rand(-100, window.innerWidth + 100)}px`;
  const y0 = `${rand(-100, window.innerHeight + 100)}px`;
  const x1 = `${rand(-200, window.innerWidth + 200)}px`;
  const y1 = `${rand(-200, window.innerHeight + 200)}px`;

  img.style.setProperty("--size", `${size}px`);
  img.style.setProperty("--dur", `${dur}s`);
  img.style.setProperty("--spin", `${spin}s`);
  img.style.setProperty("--bounce", `${bounce}s`);

  img.style.setProperty("--x0", x0);
  img.style.setProperty("--y0", y0);
  img.style.setProperty("--x1", x1);
  img.style.setProperty("--y1", y1);

  chaos.appendChild(img);

  // Remove after a while so DOM doesn't explode forever
  setTimeout(() => img.remove(), 20000);
}

function startChaos() {
  // Spawn a bunch right away
  for (let i = 0; i < 18; i++) {
    spawnThing(GIFS[Math.floor(Math.random() * GIFS.length)]);
  }

  // Then keep spawning
  setInterval(() => {
    spawnThing(GIFS[Math.floor(Math.random() * GIFS.length)]);
  }, 500);

  // Flashy background pulse
  setInterval(() => {
    document.body.style.filter = `hue-rotate(${Math.floor(rand(0, 360))}deg) saturate(1.4)`;
    setTimeout(() => (document.body.style.filter = ""), 180);
  }, 900);
}

async function tryPlayAudio() {
  try {
    await bgAudio.play();
    musicBtn.textContent = "🎶 Tunes playing";
    sub.textContent = "I can hear the celebration from here.";
  } catch (e) {
    // If blocked, button still works
    sub.textContent = "Hit “Start the tunes” for maximum chaos.";
  }
}

musicBtn.addEventListener("click", tryPlayAudio);

toYesBtn.addEventListener("click", () => {
  window.location.href = "yes_page.html";
});

// Start the visuals immediately
startChaos();

// Try to start audio (works best if she arrived here via clicking Agree)
tryPlayAudio();
