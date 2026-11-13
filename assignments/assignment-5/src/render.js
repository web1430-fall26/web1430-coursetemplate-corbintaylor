// All rendering functions for the app.

// DOM references
const results    = document.querySelector('#results');
const loadingMsg = document.querySelector('.status-loading');
const errorMsg   = document.querySelector('.status-error');
const emptyMsg   = document.querySelector('.status-empty');

export function showLoading() {
    // Shows the loading message
    loadingMsg.hidden = false;
}

export function hideLoading() {
    // Hides the loading message
    loadingMsg.hidden = true;
}

export function showError(message) {
    // Shows the error message
    errorMsg.textContent = message;
    errorMsg.hidden = false;
}

export function hideError() {
    // Hides the error message
    errorMsg.hidden = true;
}

export function showEmpty() {
    // Shows the no books found message
    emptyMsg.hidden = false;
}

export function hideEmpty() {
    // Hides the no books found message
    emptyMsg.hidden = true;
}

export function renderBooks(books) {
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

export function clearBooks() {
    // Clears the books 
    results.textContent = "";
}