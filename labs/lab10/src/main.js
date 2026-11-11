// The entry point that initializes the app.

import { products } from './data.js';
import { renderGrid } from './render.js';
import { buildFilter } from './events.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.getElementById('filter-bar');
  const productGrid = document.getElementById('product-grid');

  buildFilter(products, filterBar, productGrid);
  renderGrid(products, productGrid)
});