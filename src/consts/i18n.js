// Sistema de traducción para la UI
export const translations = {
  en: {
    greeting: "Hello, I'm",
    email: "Email",
    downloadCV: "Download CV",
    work: "Work",
    home: "Home",
    closeModal: "Close modal",
    project: "Project",
    development: "Development",
    finished: "Finished",
    language: "Language"
  },
  es: {
    greeting: "Hola, soy",
    email: "Correo",
    downloadCV: "Descargar CV",
    work: "Trabajo",
    home: "Inicio",
    closeModal: "Cerrar modal",
    project: "Proyecto",
    development: "En desarrollo",
    finished: "Finalizado",
    language: "Idioma"
  }
};

// Función para obtener el idioma actual
export function getCurrentLanguage() {
  if (typeof window === 'undefined') return 'en'; // SSR default
  return localStorage.getItem('language') || 'en';
}

// Función para establecer el idioma
export function setLanguage(lang) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }
}

// Función para obtener una traducción
export function t(key, lang = null) {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang]?.[key] || key;
}
