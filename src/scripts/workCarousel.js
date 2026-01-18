export function initWorkCarousel() {
  const carousel = document.querySelector('.work-marquee');
  const track = document.querySelector('.work-track-marquee');
  
  if (!carousel || !track) {
    setTimeout(initWorkCarousel, 100);
    return;
  }

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let animationOffset = 0;
  let lastAnimationTime = Date.now();
  let animationSpeed = 0.3; // píxeles por frame (ajusta según necesites)
  let isPaused = false;
  let pauseTimeout = null;
  let animationFrameId = null;

  // Obtener el ancho de una tarjeta + gap
  function getCardWidth() {
    const firstCard = track.querySelector('.work-card');
    if (!firstCard) return 280 + 24; // width + gap por defecto
    const cardStyle = window.getComputedStyle(firstCard);
    const gap = parseInt(window.getComputedStyle(track).gap) || 24;
    return firstCard.offsetWidth + gap;
  }

  // Obtener el ancho total del track (solo la primera mitad, ya que está duplicado)
  function getTrackWidth() {
    const cardWidth = getCardWidth();
    const projectCount = track.children.length / 2; // Dividido por 2 porque hay duplicados
    return cardWidth * projectCount;
  }

  // Actualizar la posición basada en la animación
  function updateAnimation() {
    if (isDragging || isPaused) {
      animationFrameId = null;
      return;
    }

    const now = Date.now();
    const deltaTime = now - lastAnimationTime;
    lastAnimationTime = now;

    // Calcular el desplazamiento basado en el tiempo
    animationOffset += animationSpeed * (deltaTime / 16); // Normalizar a ~60fps

    const maxOffset = getTrackWidth();
    
    // Resetear cuando llegue al máximo (porque está duplicado)
    if (animationOffset >= maxOffset) {
      animationOffset = animationOffset - maxOffset;
    }

    // Aplicar el transform
    track.style.transform = `translateX(-${animationOffset}px)`;
    
    animationFrameId = requestAnimationFrame(updateAnimation);
  }

  // Manejar inicio del arrastre
  function handleMouseDown(e) {
    isDragging = true;
    isPaused = true;
    
    // Cancelar cualquier timeout de reanudación
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
      pauseTimeout = null;
    }

    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = animationOffset;

    // Prevenir selección de texto durante el arrastre
    e.preventDefault();
  }

  // Manejar el arrastre
  function handleMouseMove(e) {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplicador para hacer el arrastre más sensible
    let newOffset = scrollLeft - walk;

    // Limitar el desplazamiento
    const maxOffset = getTrackWidth();
    if (newOffset < 0) {
      newOffset = 0;
    } else if (newOffset >= maxOffset) {
      newOffset = maxOffset;
    }

    animationOffset = newOffset;
    track.style.transform = `translateX(-${animationOffset}px)`;
  }

  // Manejar fin del arrastre
  function handleMouseUp() {
    if (!isDragging) return;

    isDragging = false;
    carousel.style.cursor = 'grab';

    // Asegurar que el offset esté dentro del rango válido
    const maxOffset = getTrackWidth();
    if (animationOffset < 0) {
      animationOffset = 0;
    } else if (animationOffset >= maxOffset) {
      animationOffset = animationOffset % maxOffset;
    }

    // Reanudar la animación después de un breve delay
    pauseTimeout = setTimeout(() => {
      isPaused = false;
      lastAnimationTime = Date.now();
      if (!animationFrameId) {
        updateAnimation();
      }
    }, 500); // Esperar 500ms antes de reanudar
  }

  // Manejar salida del mouse durante arrastre
  function handleMouseLeave() {
    if (isDragging) {
      handleMouseUp();
    }
  }

  // Manejar salida del mouse (para reanudar animación)
  function handleMouseLeaveCarousel() {
    if (isDragging) {
      handleMouseUp();
    } else {
      // Reanudar animación después de salir del hover
      pauseTimeout = setTimeout(() => {
        isPaused = false;
        lastAnimationTime = Date.now();
        if (!animationFrameId) {
          updateAnimation();
        }
      }, 300);
    }
  }

  // Soporte para touch (móviles)
  function handleTouchStart(e) {
    isDragging = true;
    isPaused = true;
    
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
      pauseTimeout = null;
    }

    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = animationOffset;
  }

  function handleTouchMove(e) {
    if (!isDragging) return;

    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    let newOffset = scrollLeft - walk;

    const maxOffset = getTrackWidth();
    if (newOffset < 0) {
      newOffset = 0;
    } else if (newOffset >= maxOffset) {
      newOffset = maxOffset;
    }

    animationOffset = newOffset;
    track.style.transform = `translateX(-${animationOffset}px)`;
  }

  function handleTouchEnd() {
    if (isDragging) {
      isDragging = false;
      
      // Asegurar que el offset esté dentro del rango válido
      const maxOffset = getTrackWidth();
      if (animationOffset < 0) {
        animationOffset = 0;
      } else if (animationOffset >= maxOffset) {
        animationOffset = animationOffset % maxOffset;
      }
      
      pauseTimeout = setTimeout(() => {
        isPaused = false;
        lastAnimationTime = Date.now();
        if (!animationFrameId) {
          updateAnimation();
        }
      }, 500);
    }
  }

  // Configurar estilos iniciales
  carousel.style.cursor = 'grab';
  carousel.style.userSelect = 'none';
  track.style.willChange = 'transform';
  
  // Marcar que JavaScript está activo (para desactivar animación CSS)
  carousel.classList.add('js-enabled');

  // Event listeners para mouse
  carousel.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  // Event listeners para touch
  carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
  carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
  carousel.addEventListener('touchend', handleTouchEnd);

  // Pausar al hacer hover (opcional)
  carousel.addEventListener('mouseenter', () => {
    if (!isDragging) {
      isPaused = true;
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
        pauseTimeout = null;
      }
    }
  });

  carousel.addEventListener('mouseleave', handleMouseLeaveCarousel);

  // Iniciar la animación
  lastAnimationTime = Date.now();
  updateAnimation();
}
