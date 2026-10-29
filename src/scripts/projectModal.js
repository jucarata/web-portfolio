import { getCurrentLanguage, t } from "../consts/i18n.js";

// Cargar proyectos según el idioma
async function loadProjects() {
  const lang = getCurrentLanguage();
  if (lang === 'es') {
    const module = await import("../consts/projects.es.js");
    return module.projects;
  } else {
    const module = await import("../consts/projects.en.js");
    return module.projects;
  }
}

// Función helper para construir rutas con base path
function getImageUrl(path) {
  // Detectar el base path desde la URL actual
  // En producción: /web-portfolio/
  // En desarrollo: /
  const currentPath = window.location.pathname;
  let base = '';
  
  // Si la URL contiene /web-portfolio/, ese es nuestro base path
  if (currentPath.includes('/web-portfolio')) {
    base = '/web-portfolio';
  }
  
  // Si la ruta ya tiene el base path, no duplicarlo
  if (path.startsWith(base)) {
    return path;
  }
  
  // Construir la ruta completa con base path
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  return base + cleanPath;
}

export async function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalState = document.getElementById("modal-state");
  const modalDescription = document.getElementById("modal-description");
  const modalUrlButton = document.getElementById("modal-url-button");

  if (!modal || !modalOverlay || !modalClose) return;

  // Cargar proyectos iniciales
  const projects = await loadProjects();
  window.currentProjects = projects;

  // Actualizar aria-label del botón cerrar
  if (modalClose) {
    const lang = getCurrentLanguage();
    modalClose.setAttribute('aria-label', t('closeModal', lang));
  }

  const workCards = document.querySelectorAll(".work-card[data-project-index]");

  async function openModal(projectIndex) {
    const currentProjects = window.currentProjects || await loadProjects();
    const project = currentProjects[projectIndex];
    if (!project) return;

    // Guardar el índice del proyecto abierto
    window.currentProjectIndex = projectIndex;

    const lang = getCurrentLanguage();
    modalImage.src = getImageUrl(project.image_url);
    modalImage.alt = `${t('project', lang)} ${project.name}`;
    modalTitle.textContent = project.name;
    
    // Actualizar estado del modal (sin traducir)
    if (modalState && project.state) {
      const stateKey = project.state.toLowerCase();
      modalState.textContent = project.state;
      modalState.className = `modal-state modal-state-${stateKey}`;
    }
    
    modalDescription.textContent = project.description || "";
    
    // Mostrar/ocultar botón de URL según si el proyecto tiene URL
    if (modalUrlButton) {
      if (project.url) {
        modalUrlButton.href = project.url;
        modalUrlButton.style.display = "inline-flex";
        // Actualizar texto del botón según el idioma
        const buttonText = modalUrlButton.querySelector('span[data-i18n]');
        if (buttonText) {
          buttonText.textContent = t('visitProject', lang);
        }
      } else {
        modalUrlButton.style.display = "none";
      }
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    
    // Pausar la animación del carrusel
    const workTrack = document.querySelector(".work-track-marquee");
    if (workTrack) {
      workTrack.style.animationPlayState = "paused";
    }
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    
    // Reanudar la animación del carrusel
    const workTrack = document.querySelector(".work-track-marquee");
    if (workTrack) {
      workTrack.style.animationPlayState = "running";
    }
  }

  // Abrir modal al hacer click en el proyecto
  workCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const projectIndex = parseInt(card.getAttribute("data-project-index"));
      if (isNaN(projectIndex)) return;
      openModal(projectIndex);
    });
  });

  // Cerrar modal al hacer click en el overlay o el botón de cerrar
  modalOverlay.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);

  // Cerrar modal con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}
