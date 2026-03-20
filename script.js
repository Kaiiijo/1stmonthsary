/* ============================================================
   MONTHSARY WEBSITE — script.js
   Particles · Scroll Reveal · Typewriter · Surprise
   ============================================================ */

// ── PARTICLE CANVAS ─────────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');

let W, H, particles = [];

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

const COLORS = [
  'rgba(255,182,193,0.7)',
  'rgba(255,214,224,0.6)',
  'rgba(255,232,161,0.6)',
  'rgba(255,133,161,0.5)',
  'rgba(255,200,210,0.5)',
];

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = Math.random() * 3 + 1;
    this.dx   = (Math.random() - 0.5) * 0.4;
    this.dy   = (Math.random() - 0.5) * 0.4;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.6 + 0.2;
    this.life  = 0;
    this.maxLife = Math.random() * 300 + 200;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha * Math.sin((this.life / this.maxLife) * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.life++;
    if (this.life >= this.maxLife) this.reset();
  }
}

function initParticles() {
  const count = Math.min(80, Math.floor((W * H) / 15000));
  particles = Array.from({ length: count }, () => new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// ── FLOATING HEARTS (HERO) ──────────────────────────────────
const heartsContainer = document.getElementById('floatingHearts');
const HEART_SYMBOLS   = ['❤️','💕','💖','💗','💓','🌸','✨'];

function spawnHeart() {
  const el = document.createElement('span');
  el.className = 'fheart';
  el.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];
  el.style.cssText = `
    left: ${Math.random() * 100}%;
    font-size: ${Math.random() * 1.2 + 0.7}rem;
    animation-duration: ${Math.random() * 8 + 7}s;
    animation-delay: ${Math.random() * 3}s;
  `;
  heartsContainer.appendChild(el);
  setTimeout(() => el.remove(), 12000);
}

setInterval(spawnHeart, 700);
// Seed a few immediately
for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 150);


// ── SCROLL REVEAL ────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay ? parseInt(e.target.dataset.delay) : 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal, .reason-card').forEach(el => observer.observe(el));


// ── LOVE LETTER TYPEWRITER ───────────────────────────────────
const LETTER_TEXT = `Happy 1st Monthsary, Hon, asawa ko na napakagandaaa.

Sobrang thankful ako at naaamaze on how one month can feel like both a short moment and a lifetime at the same time. In just these past weeks, you've already become such an important part of my life hon, someone I think about constantly, someone who brings me comfort, happiness, and a sense of home I didn't even realize I was looking for.

Thank you for every smile you've given me, every laugh we've shared, and every little moment that made this first chapter of us so special. Even the simplest conversations with you mean more to me than I can fully put into words. You've made my days brighter and my nights calmer, just by being you. even though may mga away tayo hon, I'm still thankful everyday because I have you.

I know this is only our first month mahal, but I already see something real and lasting in what we have. You're not just my girlfriend, you're the person I want to grow with, build memories with, and face life with. If this is how beautiful the beginning is, I can't wait to see what the future holds for us.

I promise to keep choosing you, to keep understanding you, and to keep loving you more with each passing day. No matter what comes our way, I'll be here supporting you, caring for you, and reminding you how much you mean to me.

Happy 1st monthsary, asawa ko. I love you more than words can ever explain.`;

const letterEl    = document.getElementById('letterText');
const signatureEl = document.querySelector('.letter-signature');
let   letterStarted = false;

const letterObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !letterStarted) {
      letterStarted = true;
      startLetter();
    }
  },
  { threshold: 0.25 }
);
letterObserver.observe(document.getElementById('letterSection'));

function startLetter() {
  const paragraphs = LETTER_TEXT.split('\n\n').filter(p => p.trim());
  letterEl.innerHTML = '';
  let paraDelay = 0;

  paragraphs.forEach((para, i) => {
    const p = document.createElement('p');
    p.className = 'paragraph';
    p.textContent = para;
    letterEl.appendChild(p);

    setTimeout(() => {
      p.classList.add('visible');
    }, paraDelay);

    paraDelay += 900;
  });

  // Show signature after all paragraphs
  setTimeout(() => {
    signatureEl.classList.add('visible');
  }, paraDelay + 400);
}


// ── MUSIC TOGGLE ─────────────────────────────────────────────
const musicBtn  = document.getElementById('musicBtn');
const bgMusic   = document.getElementById('bgMusic');
let   isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (!bgMusic.src || bgMusic.src === window.location.href) {
    // No audio file set — show friendly message
    showMusicNote();
    return;
  }

  if (isPlaying) {
    bgMusic.pause();
    musicBtn.querySelector('.music-label').textContent = 'Our Song';
    musicBtn.classList.remove('playing');
  } else {
    bgMusic.play().catch(() => {});
    musicBtn.querySelector('.music-label').textContent = 'Playing ♫';
    musicBtn.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

function showMusicNote() {
  const existing = document.querySelector('.music-note-tip');
  if (existing) { existing.remove(); return; }
  const tip = document.createElement('div');
  tip.className = 'music-note-tip';
  tip.style.cssText = `
    position: fixed; top: 64px; right: 20px; z-index: 999;
    background: rgba(255,255,255,0.92); border: 1px solid #ffb3c6;
    border-radius: 14px; padding: 14px 18px; max-width: 240px;
    font-family: 'Lato', sans-serif; font-size: 0.80rem;
    color: #7a5c6e; line-height: 1.55; backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(180,80,120,0.15);
    animation: fadeUp 0.4s ease forwards;
  `;
  tip.innerHTML = '🎵 Add a <strong>music.mp3</strong> file to this folder and add it inside the &lt;audio&gt; tag in index.html to enable music.';
  document.body.appendChild(tip);
  setTimeout(() => { if (tip.parentNode) tip.remove(); }, 5000);
}


// ── SURPRISE BUTTON ──────────────────────────────────────────
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMsg = document.getElementById('surpriseMsg');
const surpriseStars = document.getElementById('surpriseStars');
let   surpriseOpen = false;

surpriseBtn.addEventListener('click', () => {
  if (surpriseOpen) return;
  surpriseOpen = true;

  // Button transform
  surpriseBtn.style.transform = 'scale(0.92)';
  setTimeout(() => {
    surpriseBtn.style.transform = '';
  }, 150);

  // Burst stars
  burstStars();

  // Open message
  setTimeout(() => {
    surpriseMsg.classList.add('open');
    surpriseMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);

  // Change button
  setTimeout(() => {
    surpriseBtn.querySelector('.btn-text').textContent = 'With all my love ❤️';
    surpriseBtn.style.opacity = '0.7';
    surpriseBtn.style.cursor  = 'default';
    surpriseBtn.style.pointerEvents = 'none';
  }, 400);
});

function burstStars() {
  surpriseStars.innerHTML = '';
  const rect = surpriseBtn.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;

  for (let i = 0; i < 24; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    const angle  = (i / 24) * Math.PI * 2;
    const dist   = 60 + Math.random() * 100;
    const tx     = Math.cos(angle) * dist;
    const ty     = Math.sin(angle) * dist;
    const colors = ['#ff85a1','#ffb3c6','#ffe8a1','#ffd6e0','#ffffff'];
    star.style.cssText = `
      left: 50%; top: 50%;
      width: ${Math.random() * 6 + 3}px;
      height: ${Math.random() * 6 + 3}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation: star-burst ${0.8 + Math.random() * 0.7}s ease-out forwards;
      animation-delay: ${Math.random() * 0.2}s;
    `;
    star.style.setProperty('--tx', `${tx}px`);
    star.style.setProperty('--ty', `${ty}px`);
    // Override with individual keyframe via transform
    star.animate([
      { transform: 'translate(-50%,-50%) scale(0)', opacity: 1 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`, opacity: 0.9, offset: 0.4 },
      { transform: `translate(calc(-50% + ${tx * 1.4}px), calc(-50% + ${ty * 1.4}px)) scale(0.5)`, opacity: 0 }
    ], { duration: 900 + Math.random() * 500, delay: Math.random() * 200, fill: 'forwards' });
    surpriseStars.appendChild(star);
  }

  // Also burst floating hearts from button area
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'fheart';
      el.textContent = HEART_SYMBOLS[Math.floor(Math.random() * 4)];
      el.style.cssText = `
        left: ${40 + Math.random() * 20}%;
        font-size: ${Math.random() * 1.4 + 0.8}rem;
        animation-duration: ${Math.random() * 5 + 5}s;
        animation-delay: 0s;
        position: fixed;
        bottom: 40%;
      `;
      heartsContainer.appendChild(el);
      setTimeout(() => el.remove(), 7000);
    }, i * 120);
  }
}


// ── PARALLAX HERO ────────────────────────────────────────────
const heroSection = document.getElementById('hero');
const heroContent = heroSection.querySelector('.hero-content');
const heroBgGlow  = heroSection.querySelector('.hero-bg-glow');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight * 1.2) {
    heroContent.style.transform = `translateY(${scrollY * 0.22}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - scrollY / (window.innerHeight * 0.8));
    heroBgGlow.style.transform  = `translate(-50%, calc(-50% + ${scrollY * 0.12}px))`;
  }
}, { passive: true });


// ── SUBTLE CURSOR TRAIL (DESKTOP ONLY) ───────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  let trails = [];
  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed; z-index: 9999; pointer-events: none;
      left: ${e.clientX}px; top: ${e.clientY}px;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgba(255, 133, 161, 0.45);
      transform: translate(-50%, -50%) scale(1);
      transition: opacity 0.6s ease, transform 0.6s ease;
    `;
    document.body.appendChild(trail);
    trails.push(trail);
    requestAnimationFrame(() => {
      trail.style.opacity   = '0';
      trail.style.transform = 'translate(-50%, -50%) scale(2.5)';
    });
    setTimeout(() => { trail.remove(); }, 600);
    if (trails.length > 20) {
      const old = trails.shift();
      if (old.parentNode) old.remove();
    }
  });
}


// ── CARD TILT (DESKTOP ONLY) ─────────────────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) scale(1.01) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


// ── SMOOTH SECTION ENTRANCE ───────────────────────────────────
// Add reveal class to major sections
['letterSection', 'reasonsSection', 'surpriseSection'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    const label = el.querySelector('.section-label');
    const title = el.querySelector('.section-title');
    const hint  = el.querySelector('.surprise-hint');
    const btn   = el.querySelector('.surprise-btn');
    [label, title, hint, btn].forEach(el => {
      if (el) {
        el.classList.add('reveal');
        observer.observe(el);
      }
    });
  }
});
