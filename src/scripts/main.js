import { initCurtains } from "./animations/curtains.js";
import { initNavigation } from "./navigation.js";
import { initProjectModal } from "./projectModal.js";
import { initWorkCarousel } from "./workCarousel.js";

export function initAll() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        initCurtains();
        initNavigation();
        initProjectModal();
        initWorkCarousel();
      }, 100);
    });
  } else {
    setTimeout(() => {
      initCurtains();
      initNavigation();
      initProjectModal();
      initWorkCarousel();
    }, 100);
  }
}

// Auto-inicializar si se importa directamente
if (import.meta.hot) {
  // En desarrollo con HMR
  initAll();
} else {
  // En producción
  initAll();
}
