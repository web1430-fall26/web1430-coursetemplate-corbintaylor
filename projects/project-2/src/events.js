// Handles the event functions.

import { renderBookOptions, renderChapterOptions, showLoading, showError, showEmpty, 
         hideMessages, clearChapter, renderChapter } from './render.js';
import { BOOK_FILTER, CHAPTER_FILTER, SEARCH_BTN } from './const.js';
import { fetchBooks, fetchChapter } from './api.js';
import { normalizeBooks, normalizeChapter } from './normalize.js';

const bookSelect = document.getElementById(BOOK_FILTER);
const chapterSelect = document.getElementById(CHAPTER_FILTER);
const searchBtn = document.getElementById(SEARCH_BTN);

export async function initBookSelect() {
    // Initializes the book select dropdown
    showLoading();

    try {
        const bookData = await fetchBooks();
        const books = normalizeBooks(bookData);

        if (books.length === 0) {
            showEmpty();
            clearChapter();
        } else {
            hideMessages();
            renderBookOptions(books);
            return books;
        }
    } catch (error) {
        showError(`There was an error loading the books: ${error}`);
        console.error(error);
        clearChapter();
    } 
}

export function handleChapterSelect(books) {
    // Renders the chapter options
    renderChapterOptions(books[0].chapterCount);

    bookSelect.addEventListener('change', () => {
        const bookIndex = bookSelect.value;
        const chapterCount = books[bookIndex].chapterCount;

        renderChapterOptions(chapterCount);
    });
}

async function handleChapterRequest(chapterRef, chapterNum) {
    // Fetches and renders the chapter based on the filters
    showLoading();

    try {
        const chapterData = await fetchChapter(`${chapterRef}.${chapterNum}`);
        const chapter = normalizeChapter(chapterData);

        if (chapter.content.length === 0) {
            showEmpty();
            clearChapter();
        } else {
            hideMessages();
            renderChapter(chapter);
        }
    } catch (error) {
        showError(`There was an error loading the chapter: ${error}`);
        console.error(error);
        clearChapter();
    }
}

export function handleChapterSearch(books) {
    // Renders an initial chapter and handles chapter searches
    handleChapterRequest('GEN', 1);

    searchBtn.addEventListener('click', () => {
        handleChapterRequest(books[bookSelect.value].reference, chapterSelect.value);
    });
}