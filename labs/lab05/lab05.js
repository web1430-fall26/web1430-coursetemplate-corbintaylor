import {products} from "./data.js";     // Imports the products

const productGrid = document.getElementById('product-grid');  // Gets the product grid element
const filterBarDiv = document.getElementById('filter-bar');  // Gets the filter bar div
const sortSelect = document.getElementById('sort-order');  // Gets the 'Sort by Price' element

function filterByCategory(productList, category) {
    // Returns all products if the category is 'All'
    if (category === 'All') {          
        return productList;
    } else {     
        // Arrow function is used to filter the products that have the same category                       
        return productList.filter(product => product.category === category);
    }
}

function getCategories(productList) {
    // Initializes an array with 'All' as the first element
    let categories = ['All'];       
    // Loops through each product and pushes its category to the array    
    productList.forEach(product => categories.push(product.category));          
    // Uses a Set to only return unique categories
    return [...new Set(categories)];
}

// Formats the price with a $
function formatPrice(amount) {
    return `$${amount}`;
}

function sortByPrice(productList, direction) {
    if (direction === 'asc') {
        // .sort() checks whether a is greater than b by using subtraction (neg -> a is less than b)
        // a - b results in ascending order
        // .slice() returns a copy of the array
        return productList.slice().sort((a, b) => a.price - b.price); 
    } else if (direction === 'desc') {
        // b - a results in descending order
        return productList.slice().sort((a, b) => b.price - a.price);
    }

    // Defaults to return the list with no sorting
    return productList.slice();
}

function renderProductCard(product) {
    // Creates an article element
    const productCard = document.createElement('article');
    // Adds a class to productCart
    productCard.classList.add('product-card');
    // Creates an h2 element for the product card title
    const productName = document.createElement('h2');
    // Sets the title to the product name
    productName.textContent = product.name;
    // Creates a <p> element for the category
    const productCategory = document.createElement('p');

    productCategory.classList.add('product-category');

    productCategory.textContent = product.category;

    const productPrice = document.createElement('p');

    productPrice.classList.add('product-price');
    // Uses the formatPrice function 
    productPrice.textContent = formatPrice(product.price);

    const stockStatus = document.createElement('span');

    // Checks the stock status before adding the corresponding class and text
    if (product.inStock) {
        stockStatus.classList.add('in-stock');
        stockStatus.textContent = 'In Stock';
    } else {
        stockStatus.classList.add('out-of-stock');
        productCard.classList.add('no-stock');
        stockStatus.textContent = 'Out of Stock';
    }
    // Creates the add to cart button
    const addToCartBtn = document.createElement('button');

    addToCartBtn.textContent = 'Add to Cart';
    // Disables the button if the product is out of stock
    if (!product.inStock) {
        addToCartBtn.disabled = true;
        addToCartBtn.classList.add('out-of-stock');
    }

    // Appends the elements to the product card
    productCard.append(productName, productCategory, productPrice, stockStatus, addToCartBtn);

    return productCard;
}

function renderProductList(productList, container) {
    // Clears the container before rendering
    container.textContent = ''; 

    // Makes sure there are products in the list
    if (productList.length > 0) {
        // For each product, a card is rendered and appended to the container
        productList.forEach(product => container.append(renderProductCard(product)));
    } else {
        // If there are no products, a message is displayed
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'No products found.';
        container.append(emptyMsg);
    }
}

function renderCategoryFilter(categories, container) {
    const categoryFilter = document.createElement('select');
    categoryFilter.classList.add('filter-select');
    // Loops through the categories and creates an option for each
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.append(option);
    });

    // Appends the category filter to the container
    container.append(categoryFilter);
}

// Once the DOM loads, the category filter and the product list are rendered
document.addEventListener('DOMContentLoaded', () => {
    renderCategoryFilter(getCategories(products), filterBarDiv);
    renderProductList(products, productGrid);
});

// When the filter bar changes, the product list is re-rendered based on the selected category
filterBarDiv.addEventListener('change', updateProductList);

// Updates the product list based on the selected sort order while preserving the category filter
sortSelect.addEventListener('change', updateProductList);

// Combines the updates into one function that can be attached to the separate event listeners
function updateProductList() {
    const sortOrder = sortSelect.value;
    // The .querySelector had to be used because the element is created dynamically and is assigned a class
    const filterValue = filterBarDiv.querySelector('.filter-select').value;
    renderProductList(sortByPrice(filterByCategory(products, filterValue), sortOrder), productGrid);
}