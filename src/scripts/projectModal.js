import { projects } from "/src/consts/projects.js";

export function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");

  if (!modal || !modalOverlay || !modalClose) return;

  const workCards = document.querySelectorAll(".work-card[data-project-index]");
  let hoverTimeout = null;
  let currentCard = null;

  function openModal(projectIndex) {
    const project = projects[projectIndex];
    if (!project) return;

    modalImage.src = project.image_url;
    modalImage.alt = `Proyecto ${project.name}`;
    modalTitle.textContent = project.name;
    modalDescription.textContent = project.description || "";

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
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    currentCard = null;
    
    // Reanudar la animación del carrusel
    const workTrack = document.querySelector(".work-track-marquee");
    if (workTrack) {
      workTrack.style.animationPlayState = "running";
    }
  }

  // Abrir modal después de 2 segundos de hover
  workCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      currentCard = card;
      const projectIndex = parseInt(card.getAttribute("data-project-index"));
      if (isNaN(projectIndex)) return;

      hoverTimeout = setTimeout(() => {
        openModal(projectIndex);
      }, 300);
    });

    card.addEventListener("mouseleave", () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
      currentCard = null;
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
