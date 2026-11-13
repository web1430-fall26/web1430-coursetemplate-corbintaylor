// Functions for handling buttons. They are used with events.js.

import { hideError, hideEmpty, showError, showLoading, showEmpty, clearBooks, renderBooks, hideLoading } from './render.js';
import { fetchBooks } from './api.js';
import { normalizeBooks } from './normalize.js';

export function handleExpand(event) {
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
}

export async function handleSubmit(inputValue) {
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