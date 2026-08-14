// =========================================================
// Md Adnan — Portfolio Interactions
// Extracted from inline <script> for maintainability.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------
  // 1. Interactive cloud/mist particle background
  // ---------------------------------------------------------
  const canvas = document.getElementById('cloud-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const particles = [];
  let mouse = { x: -1000, y: -1000 };
  let mouseTimeout;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Spawn new mist particles around the cursor
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: mouse.x + (Math.random() - 0.5) * 40,
        y: mouse.y + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8 - 0.5,
        radius: Math.random() * 40 + 20,
        life: 1,
        decay: Math.random() * 0.015 + 0.005,
      });
    }

    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {}, 100);
  });

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // Ambient mist so the background stays alive even without mouse movement
    if (Math.random() < 0.25) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.2,
        radius: Math.random() * 60 + 30,
        life: 0.6,
        decay: Math.random() * 0.006 + 0.002,
      });
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.radius += 0.4;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${p.life * 0.06})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ---------------------------------------------------------
  // 2. Hero -> main portfolio transition
  // ---------------------------------------------------------
  const enterBtn = document.getElementById('enter-btn');
  const mainPortfolio = document.getElementById('main-portfolio');

  enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mainPortfolio.scrollIntoView({ behavior: 'smooth' });
  });

  // ---------------------------------------------------------
  // 3. Scroll-spy for the sticky nav
  // ---------------------------------------------------------
  const sections = document.querySelectorAll('#main-portfolio section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0,
  });

  sections.forEach((section) => spyObserver.observe(section));

  // ---------------------------------------------------------
  // 4. Reveal-on-scroll animation
  // ---------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  });

  revealElements.forEach((el) => revealObserver.observe(el));
});
