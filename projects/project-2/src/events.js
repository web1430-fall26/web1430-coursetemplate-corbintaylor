// Handles the event functions.

import { renderChapterOptions } from './render.js';
import { BOOK_FILTER, CHAPTER_FILTER } from './const.js';

const bookSelect = document.getElementById(BOOK_FILTER);
const chapterSelect = document.getElementById(CHAPTER_FILTER);

export function handleChapterSelect(books) {
    // Renders the chapter options
    renderChapterOptions(books[0].chapterCount);

    bookSelect.addEventListener('change', () => {
        const bookIndex = bookSelect.value;
        const chapterCount = books[bookIndex].chapterCount;

        chapterSelect.textContent = '';
        renderChapterOptions(chapterCount);
    });
}