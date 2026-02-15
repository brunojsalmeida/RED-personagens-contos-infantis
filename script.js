const heroVideo = document.getElementById("heroVideo");
const heroSection = document.querySelector(".hero");
const heroOverlay = document.querySelector(".hero-overlay");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const heroHeight = heroSection.offsetHeight;

  // Progresso de scroll dentro da hero (0 a 1)
  let progress = Math.min(scrollY / heroHeight, 1);

  // Blur máximo desejado
  let blurValue = progress * 8; // ajuste aqui (8px ideal)

  heroVideo.style.filter = `blur(${blurValue}px)`;

  // Overlay levemente mais escuro conforme scroll
  heroOverlay.style.background = `
    linear-gradient(
      to bottom,
      rgba(10, 10, 30, ${0.6 + progress * 0.2}),
      rgba(10, 10, 40, ${0.75 + progress * 0.2})
    )
  `;
});

function scrollToSection() {
  document.querySelector('.cinderela').scrollIntoView({
    behavior: 'smooth'
  });
}

const sections = document.querySelectorAll('.parallax');
const characters = document.querySelectorAll('.character');
const finalSection = document.getElementById('finalSection');

window.addEventListener('scroll', () => {

  // Animação das seções parallax
  const trigger = window.innerHeight * 0.8;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;

    if (top < trigger) {
      section.classList.add('active');
    }
  });

  // Animação final stagger
  const finalTop = finalSection.getBoundingClientRect().top;

  if (finalTop < trigger) {
    characters.forEach((char, index) => {
      setTimeout(() => {
        char.classList.add('show');
      }, index * 300); // efeito cascata
    });
  }

});


const canvas = document.getElementById("magicParticles");
const ctx = canvas.getContext("2d");

let particlesArray = [];
let numberOfParticles = 180;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  update() {
    this.y -= this.speedY;

    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(255, 215, 120, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

const revealElements = document.querySelectorAll(".content");

const revealOnScroll = () => {
  const triggerPoint = window.innerHeight * 0.85;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerPoint) {
      element.classList.add("reveal");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =====================
   MODAL CONTROL
===================== */

const openModal = document.getElementById('openModal');
const modalOverlay = document.getElementById('modalOverlay');

openModal.addEventListener('click', () => {
  modalOverlay.classList.add('active');
  intensity = 6; // intensifica partículas
});

modalOverlay.addEventListener('click', (e) => {
  if(e.target === modalOverlay){
    modalOverlay.classList.remove('active');
    intensity = 2; // volta ao normal
  }
});

const submitBtn = document.getElementById("submitCharacter");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const modalOverlay = document.getElementById("modalOverlay");
    modalOverlay.classList.remove("active");
  });
}
