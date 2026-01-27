// ================================
// PRELOADER
// ================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader-wrapper');
  setTimeout(() => {
    preloader?.remove();
  }, 5000);
});

// ================================
// FECHA DINÁMICA EN FOOTER
// ================================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ================================
// CARRUSEL (AISLADO / NO CONFLICTOS)
// ================================
(() => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.slide');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  let current = 0;
  let autoplay;

  // INIT
  slides[0]?.classList.add('active');

  // DOTS
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer?.appendChild(dot);
  });

  const dots = dotsContainer?.querySelectorAll('span') || [];

  function goTo(index) {
    if (index === current) return;

    slides[current].classList.remove('active');
    slides[current].classList.add('exit');

    const prev = current;
    current = index;

    slides[current].classList.add('active');

    setTimeout(() => {
      slides[prev].classList.remove('exit');
    }, 900);

    dots.forEach(d => d.classList.remove('active'));
    dots[current]?.classList.add('active');
  }

  // CONTROLES
  nextBtn?.addEventListener('click', () =>
    goTo((current + 1) % slides.length)
  );

  prevBtn?.addEventListener('click', () =>
    goTo((current - 1 + slides.length) % slides.length)
  );

  // AUTOPLAY
  function startAuto() {
    autoplay = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 4800);
  }

  function stopAuto() {
    clearInterval(autoplay);
  }

  startAuto();

  // PAUSA EN HOVER
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
})();

// ================================
// NAV ACTIVO SEGÚN SCROLL (INICIO)
// ================================
(() => {
  const links = document.querySelectorAll('#navMenu a');
  const sections = document.querySelectorAll('section, .container[id]');
  if (!links.length || !sections.length) return;

  function setActiveLink() {
    let current = 'inicio';

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top && section.id) {
        current = section.id;
      }
    });

    links.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // estado inicial
})();

// ================================
// CÓMO LLEGAR
// ================================
function openRoute(e) {
  e.preventDefault();
  const destination = "AV. Los Serranos 147, La Magdalena, San Mateo Atenco";
  window.open(
    "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(destination),
    "_blank"
  );
}

// ================================
// REDES SOCIALES
// ================================
function openApp(e, appUrl, webUrl) {
  e.preventDefault();
  window.open(webUrl, "_blank");
}

function openInstagram(e) {
  openApp(
    e,
    "instagram://user?username=sportimea3",
    "https://www.instagram.com/sportimea3"
  );
}

function openFacebook(e) {
  openApp(
    e,
    "fb://profile/61572079096195",
    "https://www.facebook.com/profile.php?id=61572079096195"
  );
}

// ================================
// TARJETAS SELECCIONABLES
// ================================
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    document
      .querySelectorAll('.card')
      .forEach(c => c.classList.remove('selected'));
    card.classList.toggle('selected');
  });
});

// ================================
// BOTONES PLANES → WHATSAPP
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const contenedorPlanes = document.querySelector('#planes');
  if (!contenedorPlanes) return;

  const telefonoPlanes = "527228849301";

  contenedorPlanes.querySelectorAll('.plan .cta').forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.stopPropagation();

      const planCard = boton.closest('.plan');
      if (!planCard) return;

      const plan = planCard.querySelector('h3')?.innerText || '';
      const precio = planCard.querySelector('.price')?.innerText || '';

      const mensaje =
        `Hola, me interesa el plan *${plan}* con costo de *${precio}*. ¿Me puedes dar más información?`;

      window.open(
        `https://wa.me/${telefonoPlanes}?text=${encodeURIComponent(mensaje)}`,
        '_blank'
      );
    });
  });
});
// ================================
// BOTÓN INICIO → SCROLL HASTA ARRIBA
// ================================
(() => {
  const inicioBtn = document.querySelector('#navMenu a[href="#inicio"]');
  if (!inicioBtn) return;

  inicioBtn.addEventListener('click', (e) => {
    e.preventDefault(); // evita comportamiento normal
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();
// ================================
// INICIO → SCROLL + MINI EFECTO
// ================================
(() => {
  const inicioBtn = document.querySelector('#navMenu a[href="#inicio"]');
  const header = document.querySelector('header');
  if (!inicioBtn || !header) return;

  inicioBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Scroll absoluto al top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Mini efecto visual
    header.classList.remove('flash'); // reinicia animación
    void header.offsetWidth;          // truco para reflow
    header.classList.add('flash');
  });
})();
// ================================
// HEADER → COLOR SEGÚN SECCIÓN
// ================================
(() => {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('.container[id]');
  if (!header || !sections.length) return;

  let currentSection = '';

  function updateHeaderColor() {
    sections.forEach(section => {
      const offset = section.offsetTop - 140;
      if (window.scrollY >= offset && section.id) {
        if (currentSection !== section.id) {
          // Limpia clases anteriores
          header.classList.remove(
            'section-inicio',
            'section-clases',
            'section-planes',
            'section-entrenadores'
          );

          // Aplica la nueva
          header.classList.add(`section-${section.id}`);
          currentSection = section.id;
        }
      }
    });
  }

  window.addEventListener('scroll', updateHeaderColor);
  updateHeaderColor(); // estado inicial
})();
