
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const canvas = document.getElementById('particles');
const context = canvas.getContext('2d');
let particles = [];
let width = 0;
let height = 0;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(65, Math.floor(width / 22));
  particles = Array.from({ length: count }, createParticle);
}

function createParticle() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.35 + 0.25,
    speed: Math.random() * 0.18 + 0.04,
    drift: (Math.random() - 0.5) * 0.08,
    alpha: Math.random() * 0.45 + 0.08
  };
}

function drawParticles() {
  context.clearRect(0, 0, width, height);

  particles.forEach((particle) => {
    particle.y -= particle.speed;
    particle.x += particle.drift;

    if (particle.y < -5) {
      particle.y = height + 5;
      particle.x = Math.random() * width;
    }

    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(212, 175, 55, ${particle.alpha})`;
    context.fill();
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawParticles();
