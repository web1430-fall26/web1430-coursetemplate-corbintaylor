// Contains helper functions for filtering and formatting.

export function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

export function getCategories(productList) {
  const cats = productList.map(p => p.category);
  return ['All', ...new Set(cats)];
}

export function filterProducts(productList, category) {
  if (category === 'All') return productList;
  return productList.filter(p => p.category === category);
}