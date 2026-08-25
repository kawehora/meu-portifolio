// ===== MENU MOBILE =====
const introScreen = document.getElementById('introScreen');
const introLogo = document.getElementById('introLogo');
const headerLogo = document.querySelector('.logo');

const playLogoIntro = () => {
  if (!introScreen || !introLogo || !headerLogo) return;

  const target = headerLogo.getBoundingClientRect();
  const introBounds = introLogo.getBoundingClientRect();
  const targetScale = Math.min(target.width / introBounds.width, target.height / introBounds.height);
  const targetCenterX = target.left + target.width / 2;
  const targetCenterY = target.top + target.height / 2;

  setTimeout(() => {
    introLogo.style.top = `${targetCenterY}px`;
    introLogo.style.left = `${targetCenterX}px`;
    introLogo.style.transform = `translate(-50%, -50%) scale(${targetScale})`;

    setTimeout(() => {
      document.body.classList.add('intro-complete');
      introScreen.style.transition = 'opacity 1.2s ease-out';
      introScreen.style.opacity = '0';
      setTimeout(() => introScreen.remove(), 1200);
    }, 650);
  }, 500);
};

window.addEventListener('load', playLogoIntro, { once: true });

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== ANIMAÇÃO DAS BARRAS DE SKILL AO ENTRAR NA TELA =====
const bars = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

bars.forEach(bar => barObserver.observe(bar));

// ===== ANO NO RODAPÉ =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== ANIMAÇÃO FADE-IN AO SCROLLAR (cards) =====
const revealItems = document.querySelectorAll(
  '.stat-card, .skill-card, .service-card, .project-card, .about-text, .cta-box'
);

revealItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.filter = 'blur(10px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease, filter 0.7s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.filter = 'blur(0)';
    } else {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(24px)';
      entry.target.style.filter = 'blur(10px)';
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(el => revealObserver.observe(el));

// ===== BRILHO DOS CARDS ACOMPANHANDO O CURSOR =====
const interactiveCards = document.querySelectorAll(
  '.stat-card, .skill-card, .service-card, .project-card'
);

interactiveCards.forEach(card => {
  card.addEventListener('pointermove', event => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.removeProperty('--pointer-x');
    card.style.removeProperty('--pointer-y');
  });
});

// ===== BRILHO DOS TEXTOS VERMELHOS ACOMPANHANDO O CURSOR =====
const interactiveTexts = document.querySelectorAll('.text-red');

interactiveTexts.forEach(text => {
  text.addEventListener('pointerenter', () => {
    text.classList.add('is-pointer-active');
  });

  text.addEventListener('pointermove', event => {
    const bounds = text.getBoundingClientRect();
    text.style.setProperty('--text-pointer-x', `${event.clientX - bounds.left}px`);
    text.style.setProperty('--text-pointer-y', `${event.clientY - bounds.top}px`);
  });

  text.addEventListener('pointerleave', () => {
    text.classList.remove('is-pointer-active');
    text.style.removeProperty('--text-pointer-x');
    text.style.removeProperty('--text-pointer-y');
  });
});

const cursorWhiteTexts = document.querySelectorAll('.text-cursor-white');

cursorWhiteTexts.forEach(text => {
  text.addEventListener('pointerenter', () => {
    text.classList.add('is-pointer-active');
  });

  text.addEventListener('pointermove', event => {
    const bounds = text.getBoundingClientRect();
    text.style.setProperty('--white-text-pointer-x', `${event.clientX - bounds.left}px`);
    text.style.setProperty('--white-text-pointer-y', `${event.clientY - bounds.top}px`);
  });

  text.addEventListener('pointerleave', () => {
    text.classList.remove('is-pointer-active');
    text.style.removeProperty('--white-text-pointer-x');
    text.style.removeProperty('--white-text-pointer-y');
  });
});
