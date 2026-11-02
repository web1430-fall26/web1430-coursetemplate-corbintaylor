// Base URL for the API
const baseURL = `https://openlibrary.org/search.json`;

// DOM references
const input     = document.querySelector('#search-input');
const results   = document.querySelector('#results');
const form      = document.querySelector('#search-form');

async function fetchBooks(title) {
    // Fetches the books based on the title and returns a JSON file
    const url = `${baseURL}?title=${encodeURIComponent(title)}&limit=10`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
}

function normalizeBooks(docs) {
    // Returns an array of books 
    return docs.map(doc => ({
        title: doc.title || 'Unknown Title',
        author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
        year: doc.first_publish_year || 'Unknown Year'
    }));
}

function showLoading() {
    // Handles the loading message
    results.textContent = "";

    const loadingMsg = document.createElement('p');
    loadingMsg.classList.add('status-loading');
    loadingMsg.textContent = "Searching for books...";

    results.append(loadingMsg);
}


function showError(message) {
    // Handles the error message
    results.textContent = "";

    const errorMsg = document.createElement('p');
    errorMsg.classList.add('status-error');
    errorMsg.textContent = message;

    results.append(errorMsg);
}

function showEmpty() {
    // Handles the case where no books are found
    results.textContent = "";

    const emptyMsg = document.createElement('p');
    emptyMsg.classList.add('status-empty');
    emptyMsg.textContent = "No books found. Try a different search term.";

    results.append(emptyMsg);
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

results.addEventListener('click', async (event) => {
    // Uses event delegation to handle the expand button
    if (event.target.matches('.expand-button')) {
        event.target.nextElementSibling.toggleAttribute('hidden');
        
        if (!event.target.nextElementSibling.hidden) {
            event.target.textContent = "Collapse Details";
            event.target.focus();
        } else {
            event.target.textContent = "Expand Details";
        }
    }
});

async function handleSubmit(inputValue) {
    // Separate function to handle the submit so that an initial dataset load can use the same code
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
        } else {
            renderBooks(books);
        }
    } catch (error) {
        showError('Unable to load results. Please check your connection and try again.');
        console.error(error);
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