import {products} from './data.js';     // Imports the products

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
        return productList.sort((a, b) => a.price - b.price).slice(); 
    } else if (direction === 'desc') {
        // b - a results in descending order
        return productList.sort((a, b) => b.price - a.price).slice();
    }

    // Defaults to return the list with no sorting
    return productList.slice();
}

console.log(sortByPrice(products, 'test'));