// Reveal question after scrolling
const question = document.getElementById("question");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight * 0.8) {
    question.classList.add("visible");
  }
});

// Make "No" button run away
const noBtn = document.getElementById("no");

noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// Yes button magic
const yesBtn = document.getElementById("yes");
const magicText = document.getElementById("magic-text");

yesBtn.addEventListener("click", () => {
  magicText.classList.remove("hidden");
  spawnBurst();
});

// Floating particles
const particleContainer = document.getElementById("particles");

function spawnParticle() {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = 6 + Math.random() * 6 + "s";
  particleContainer.appendChild(p);

  setTimeout(() => p.remove(), 12000);
}

setInterval(spawnParticle, 300);

// Celebration burst
function spawnBurst() {
  for (let i = 0; i < 30; i++) {
    setTimeout(spawnParticle, i * 50);
  }
}
