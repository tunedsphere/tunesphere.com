const labelCardTemplate = document.querySelector("[data-label-template]");
const labelCardContainer = document.querySelector("[data-label-cards-container]");
const searchInput = document.querySelector("[data-search]");

let labels = [];

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  labels.forEach(label => {
    const isVisible =
      label.name.toLowerCase().includes(value) ||
      label.genre.toLowerCase().includes(value);
    label.element.classList.toggle("hide", !isVisible);
  });
});

// Assuming the recordLabels array is exported from data.js
import { recordLabels } from './data.js';

labels = recordLabels.map(label => {
  const card = labelCardTemplate.content.cloneNode(true).children[0];
  const header = card.querySelector("[data-header]");
  const body = card.querySelector("[data-body]");
  header.textContent = label.name;
  body.textContent = label.genre;
  labelCardContainer.append(card);
  return { name: label.name, genre: label.genre, element: card };
});