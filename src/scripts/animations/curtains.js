export function initCurtains() {
  const curtainsContainer = document.getElementById('curtains');
  if (!curtainsContainer) {
    setTimeout(initCurtains, 100);
    return;
  }

  const leftCurtain = curtainsContainer.querySelector('.curtain-left');
  const rightCurtain = curtainsContainer.querySelector('.curtain-right');

  if (!leftCurtain || !rightCurtain) {
    setTimeout(initCurtains, 100);
    return;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateCurtains() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const viewportHeight = window.innerHeight || 1;
    const closeAt = 0.5; // 0.5 = a la mitad del siguiente viewport
    const progress = clamp(scrollY / (viewportHeight * closeAt), 0, 1);

    // 0 = abiertas (fuera de pantalla), 1 = cerradas (centro)
    const minOpenPercent = 18; // Siempre visible un poco de tela
    // Cuando progress = 0: translate = 82% (abiertas)
    // Cuando progress = 1: translate = 0% (cerradas)
    const translate = (1 - progress) * (100 - minOpenPercent);
    const skew = 5;
    
    // Aplicar transformaciones
    leftCurtain.style.transform = `translateX(-${translate}%) skewY(${skew}deg)`;
    rightCurtain.style.transform = `translateX(${translate}%) skewY(-${skew}deg)`;

    // Controlar visibilidad del navbar (aparece antes para que las cortinas estén cerradas)
    const navbar = document.getElementById('navbar');
    if (navbar) {
      // Activar el navbar cuando se alcance el 70% del viewport para que las cortinas estén cerradas
      if (scrollY >= viewportHeight * 0.7) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    }
  }

  function onScroll() {
    window.requestAnimationFrame(updateCurtains);
  }

  // Inicializar estado: cortinas abiertas al inicio
  updateCurtains();
  
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateCurtains);
}
