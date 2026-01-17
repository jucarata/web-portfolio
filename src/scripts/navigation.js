export function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
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
          const navbar = document.getElementById('navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}
