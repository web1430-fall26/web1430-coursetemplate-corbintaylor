// Renders the books and chapter to the DOM.

import { BOOK_FILTER, CHAPTER_FILTER } from './const.js';

const bookSelect = document.getElementById(BOOK_FILTER);
const chapterSelect = document.getElementById(CHAPTER_FILTER);

export function renderBookOptions(books) {
    // Renders each of the book options using a normalized array of books
    let count = 0;
    books.forEach(book => {
        const bookOption = document.createElement('option');
        bookOption.textContent = book.name;
        bookOption.value = count++;
        bookSelect.append(bookOption);
    });
}

export function renderChapterOptions(chapterCount) {
    // Renders the available chapters for a specified book
    let i = 1;
    for (i; i <= chapterCount; ++i) {
        const chapterOption = document.createElement('option');
        chapterOption.textContent = i;
        chapterOption.value = i - 1;
        chapterSelect.append(chapterOption);
    }
}