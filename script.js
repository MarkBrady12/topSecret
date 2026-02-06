// Grab elements
const question = document.getElementById("question");
const memories = document.querySelectorAll(".memory");
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

// Audio
const forestAudio = document.getElementById("forest-audio");
const hellAudio = document.getElementById("hell-audio");
const bossAudio = document.getElementById("boss-audio");

let chaosLevel = 0;
let audioStarted = false;

/* Start audio after interaction (browser rule) */
function startAudio() {
  if (!audioStarted) {
    forestAudio.volume = 0.5;
    forestAudio.play().catch(() => {});
    audioStarted = true;
  }
}

/* Reveal memories + question while scrolling */
window.addEventListener("scroll", () => {
  startAudio();

  memories.forEach(mem => {
    if (mem.getBoundingClientRect().top < window.innerHeight * 0.8) {
      mem.classList.add("visible");
    }
  });

  if (window.scrollY > window.innerHeight * 1.8) {
    question.classList.add("visible");
  }
});

/* Move NO button aggressively */
function moveNo() {
  chaosLevel++;

  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  // Escalate chaos
  if (chaosLevel > 3) {
    document.body.classList.add("hell");
    forestAudio.pause();
    hellAudio.play().catch(() => {});
  }

  if (chaosLevel > 6) {
    hellAudio.pause();
    bossAudio.play().catch(() => {});
  }
}

/* Panic when cursor is close */
document.addEventListener("mousemove", e => {
  const rect = noBtn.getBoundingClientRect();
  const dist = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );
  if (dist < 150) moveNo();
});

noBtn.addEventListener("mouseenter", moveNo);

/* YES = good ending */
yesBtn.addEventListener("click", () => {
  document.body.classList.remove("hell");
  document.body.classList.add("love");

  hellAudio.pause();
  bossAudio.pause();
  forestAudio.volume = 0.8;
  forestAudio.play().catch(() => {});

  const ending = document.createElement("div");
  ending.className = "love-message";
  ending.innerHTML = `
    🌸✨<br>
    Every path led me to you.<br>
    Happy Valentine’s Day 💖
  `;
  document.body.appendChild(ending);
});

/* Particles */
const particleContainer = document.getElementById("particles");

function spawnParticle() {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "vw";
  particleContainer.appendChild(p);
  setTimeout(() => p.remove(), 8000);
}

setInterval(spawnParticle, 300);
