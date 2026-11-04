// Base URL for the API
const baseURL = `https://openlibrary.org/search.json`;

// DOM references
const input      = document.querySelector('#search-input');
const results    = document.querySelector('#results');
const form       = document.querySelector('#search-form');
const loadingMsg = document.querySelector('.status-loading');
const errorMsg   = document.querySelector('.status-error');
const emptyMsg   = document.querySelector('.status-empty');

async function fetchBooks(title) {
    // Fetches the books based on the title and returns a JSON file
    const url = `${baseURL}?title=${encodeURIComponent(title)}&limit=10`;

    const response = await fetch(url);

    if (!response.ok) {
        showError(`Server request failed: ${response.status}`);
        throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
}

function normalizeBooks(docs) {
    // Returns an array of books 
    return docs.map(doc => ({
        title: doc.title || 'Unknown Title',
        author: doc.author_name?.[0] ?? 'Unknown Author',
        year: doc.first_publish_year || 'Unknown Year'
    }));
}

function showLoading() {
    // Shows the loading message
    loadingMsg.hidden = false;
}

function hideLoading() {
    // Hides the loading message
    loadingMsg.hidden = true;
}

function showError(message) {
    // Shows the error message
    errorMsg.textContent = message;
    errorMsg.hidden = false;
}

function hideError() {
    // Hides the error message
    errorMsg.hidden = true;
}

function showEmpty() {
    // Shows the no books found message
    emptyMsg.hidden = false;
}

function hideEmpty() {
    // Hides the no books found message
    emptyMsg.hidden = true;
}

function renderBooks(books) {
    // Renders the book title with an expand button and region for the details
    results.textContent = "";

    books.forEach(book => {
        const bookCard = document.createElement('article');
        bookCard.classList.add('book-card');

        const title = document.createElement('h2');
        title.textContent = book.title;

        const expandBtn = document.createElement('button');
        expandBtn.classList.add('expand-button');
        expandBtn.textContent = "Expand Details";

        const cardDetails = document.createElement('div');
        cardDetails.classList.add('card-details');
        cardDetails.setAttribute('tabindex', '0');

        // Author and year are in a separate details div that gets hidden
        const author = document.createElement('p');
        author.textContent = book.author;

        const year = document.createElement('p');
        year.textContent = book.year;

        cardDetails.append(author, year);
        cardDetails.hidden = true;

        bookCard.append(title, expandBtn, cardDetails);
        results.append(bookCard);
    });
}

function clearBooks() {
    // Clears the books 
    results.textContent = "";
}

results.addEventListener('click', (event) => {
    // Uses event delegation to handle the expand button
    if (event.target.matches('.expand-button')) {
        event.target.nextElementSibling.toggleAttribute('hidden');
        
        if (!event.target.nextElementSibling.hidden) {
            event.target.textContent = "Collapse Details";
            event.target.nextElementSibling.focus();
        } else {
            event.target.textContent = "Expand Details";
        }
    }
});

async function handleSubmit(inputValue) {
    // Separate function to handle the submit so that an initial dataset load can use the same code
    hideError();
    hideEmpty();
    
    const title = inputValue.trim();

    if (!title) {
        showError('Please enter a title.');
        return;
    }

    showLoading();

    try {
        const data = await fetchBooks(title);
        const books = normalizeBooks(data.docs);

        if (books.length === 0) {
            showEmpty();
            clearBooks();
        } else {
            renderBooks(books);
        }
    } catch (error) {
        showError('Unable to load results. Please check your connection and try again.');
        console.error(error);
        clearBooks();
    } finally {
        hideLoading();
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(input.value);
});

document.addEventListener('DOMContentLoaded', () => {
    // Renders an initial dataset
    handleSubmit('Lord of the Flies');
});