export function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  
  // Función para actualizar el nav-link activo
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + navbarHeight + 100; // Offset para activar antes
    
    // Si estamos cerca del top, activar "home"
    if (window.scrollY < 200) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === 'home') {
          link.classList.add('active');
        }
      });
      return;
    }
    
    // Verificar cada sección
    navLinks.forEach(link => {
      const section = link.getAttribute('data-section');
      link.classList.remove('active');
      
      if (section === 'home') {
        // Home se activa solo si estamos en el top
        if (window.scrollY < 200) {
          link.classList.add('active');
        }
      } else {
        const targetSection = document.getElementById(section);
        if (targetSection) {
          const sectionTop = targetSection.offsetTop;
          const sectionBottom = sectionTop + targetSection.offsetHeight;
          
          // Activar si el scroll está dentro de la sección
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            link.classList.add('active');
          }
        }
      }
    });
  }
  
  // Actualizar al hacer scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavLink, 10);
  });
  
  // Actualizar al cargar la página
  updateActiveNavLink();
  
  // Manejar clicks en los nav-links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      
      if (section === 'home') {
        // Scroll suave al inicio (scrollY = 0)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Scroll suave a la sección correspondiente
        const targetSection = document.getElementById(section);
        if (targetSection) {
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
      
      // Actualizar después del scroll
      setTimeout(updateActiveNavLink, 500);
    });
  });
}
