import { translations } from "./translations.js";

function getUserLanguage() {
  const lang = navigator.language.substring(0, 2);
  return translations[lang] ? lang : "en";
}

function toggleTooltip() {
  const tooltip = document.getElementById("tooltip-text");
  const lang = getUserLanguage();
  const translation = translations[lang];

  tooltip.innerHTML = `
      <strong>${translation.title}</strong><br>
      ${translation.content}
  `;

  tooltip.style.display = (tooltip.style.display === "block") ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".tooltip-icon").addEventListener("click", toggleTooltip);
});
