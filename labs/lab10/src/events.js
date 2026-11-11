// Contains the event handlers.

import { getCategories, filterProducts } from "./utils.js";
import { renderGrid } from "./render.js";

export function buildFilter(products, filterContainer, gridContainer) {
  getCategories(products).forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      const filtered = filterProducts(products, cat);
      renderGrid(filtered, gridContainer);
    });
    filterContainer.append(btn);
  });
}