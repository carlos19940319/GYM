// ================================
// PRELOADER
// ================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader-wrapper');
  setTimeout(() => {
    preloader.remove();
  }, 5000);
});

// ================================
// FECHA DINÁMICA EN FOOTER
// ================================
document.getElementById('year').textContent = new Date().getFullYear();

// ================================
// CARRUSEL
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const slideElements = document.querySelectorAll('.slide');
  const slideCount = slideElements.length;
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let index = 0;

  const showSlide = (i) => {
    slides.style.transform = `translateX(${-i * 100}%)`;
  };

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slideCount;
    showSlide(index);
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slideCount) % slideCount;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % slideCount;
    showSlide(index);
  }, 3000);
});

// ================================
// CÓMO LLEGAR
// ================================
function openRoute(e){
  e.preventDefault();
  const destination = "AV. Los Serranos 147, La Magdalena, San Mateo Atenco";
  window.open("https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(destination), "_blank");
}

// ================================
// REDES SOCIALES
// ================================
function openApp(e, appUrl, webUrl){
  e.preventDefault();
  window.open(webUrl, "_blank");
}
function openInstagram(e){ openApp(e, "instagram://user?username=sportimea3", "https://www.instagram.com/sportimea3"); }
function openFacebook(e){ openApp(e, "fb://profile/61572079096195", "https://www.facebook.com/profile.php?id=61572079096195"); }

// ================================
// TARJETAS SELECCIONABLES (ZOOM CENTRADO)
// ================================
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    if(card.classList.contains('selected')){
      // Deseleccionar tarjeta
      card.classList.remove('selected');
    } else {
      // Quitar selección de otras tarjetas
      cards.forEach(c => c.classList.remove('selected'));
      // Seleccionar tarjeta clickeada
      card.classList.add('selected');
    }
  });
});
