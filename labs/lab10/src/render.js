// Provides the rendering functions.

import { formatPrice } from './utils.js';

export function renderCard(product) {
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  h2.textContent = product.name;
  const price = document.createElement('p');
  price.textContent = formatPrice(product.price);
  const cat = document.createElement('p');
  cat.textContent = product.category;
  article.append(h2, price, cat);
  return article;
}

export function renderGrid(productList, container) {
    container.replaceChildren();
    productList.forEach(p => container.append(renderCard(p)));
}