import { setLanguage, getCurrentLanguage, t } from "../consts/i18n.js";

// Cargar proyectos según el idioma
async function loadProjects(lang) {
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

// Actualizar todos los textos de la página
function updatePageTexts(lang) {
  // Actualizar elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key, lang);
    
    // Si es un botón, solo actualizar aria-label, no el contenido
    if (element.tagName === 'BUTTON') {
      element.setAttribute('aria-label', translation);
    } 
    // Si es el título de sección, convertir a mayúsculas
    else if (element.classList.contains('section-title')) {
      element.textContent = translation.toUpperCase();
    } 
    // Para otros elementos, actualizar el texto
    else {
      element.textContent = translation;
    }
  });

  // Actualizar aria-labels de elementos que tienen aria-label pero no data-i18n directamente
  document.querySelectorAll('[aria-label]').forEach(element => {
    const i18nKey = element.getAttribute('data-i18n');
    if (i18nKey && element.tagName !== 'BUTTON') {
      element.setAttribute('aria-label', t(i18nKey, lang));
    }
  });

  document.querySelectorAll('[data-tooltip]').forEach(element => {
    const i18nKey = element.getAttribute('data-i18n');
    if (i18nKey) {
      element.setAttribute('data-tooltip', t(i18nKey, lang));
    }
  });

  // Actualizar el atributo lang del HTML
  document.documentElement.lang = lang;
}

// Actualizar proyectos en el carrusel
async function updateProjects(lang) {
  const projects = await loadProjects(lang);
  
  // Actualizar los proyectos en el DOM
  const workCards = document.querySelectorAll('.work-card[data-project-index]');
  workCards.forEach((card, index) => {
    const project = projects[index];
    if (!project) return;

    // Actualizar imagen (con base path correcto)
    const img = card.querySelector('.work-image img');
    if (img) {
      img.src = getImageUrl(project.image_url);
      img.alt = `${t('project', lang)} ${project.name}`;
    }

    // Actualizar título
    const title = card.querySelector('.work-title');
    if (title) {
      title.textContent = project.name;
    }

    // Actualizar estado (sin traducir)
    const state = card.querySelector('.work-state');
    if (state && project.state) {
      const stateKey = project.state.toLowerCase();
      state.textContent = project.state;
      state.className = `work-state work-state-${stateKey}`;
    }
  });

  // Actualizar también los elementos duplicados del marquee
  const duplicateCards = document.querySelectorAll('.work-card[aria-hidden="true"]');
  duplicateCards.forEach((card, index) => {
    const project = projects[index % projects.length];
    if (!project) return;

    const img = card.querySelector('.work-image img');
    if (img) {
      img.src = getImageUrl(project.image_url);
    }

    const title = card.querySelector('.work-title');
    if (title) {
      title.textContent = project.name;
    }

    const state = card.querySelector('.work-state');
    if (state && project.state) {
      const stateKey = project.state.toLowerCase();
      state.textContent = project.state;
      state.className = `work-state work-state-${stateKey}`;
    }
  });

  // Guardar proyectos en una variable global para el modal
  window.currentProjects = projects;
}

// Actualizar el modal si está abierto
async function updateModal(lang) {
  const modal = document.getElementById('project-modal');
  if (!modal || !modal.classList.contains('active')) return;

  const modalTitle = document.getElementById('modal-title');
  const modalState = document.getElementById('modal-state');
  const modalDescription = document.getElementById('modal-description');
  const modalClose = document.getElementById('modal-close');

  if (modalClose) {
    modalClose.setAttribute('aria-label', t('closeModal', lang));
  }

  // Si hay un proyecto abierto, actualizarlo
  if (window.currentProjectIndex !== undefined && window.currentProjects) {
    const project = window.currentProjects[window.currentProjectIndex];
    if (project) {
      const modalImage = document.getElementById('modal-image');
      if (modalImage) {
        modalImage.src = getImageUrl(project.image_url);
        modalImage.alt = `${t('project', lang)} ${project.name}`;
      }
      
      if (modalTitle) modalTitle.textContent = project.name;
      if (modalDescription) modalDescription.textContent = project.description || '';
      
      if (modalState && project.state) {
        const stateKey = project.state.toLowerCase();
        modalState.textContent = project.state;
        modalState.className = `modal-state modal-state-${stateKey}`;
      }
    }
  }
}

// Cambiar idioma
export async function changeLanguage(lang) {
  if (lang === getCurrentLanguage()) return;

  setLanguage(lang);
  updatePageTexts(lang);
  await updateProjects(lang);
  await updateModal(lang);
  
  // Actualizar botones de idioma activos
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Inicializar el sistema de idioma
export function initLanguage() {
  const currentLang = getCurrentLanguage();
  
  // Establecer idioma inicial
  setLanguage(currentLang);
  updatePageTexts(currentLang);
  
  // Cargar proyectos iniciales
  loadProjects(currentLang).then(projects => {
    window.currentProjects = projects;
  });

  // Marcar botón activo
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Agregar event listeners a los botones de idioma
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
}
