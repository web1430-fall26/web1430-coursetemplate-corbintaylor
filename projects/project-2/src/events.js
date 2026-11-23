// Handles the event functions and chapter requests.

import { renderBookOptions, renderChapterOptions, showLoading, showError, 
         showEmpty, hideMessages, clearChapter, renderChapter } from './render.js';
import { BOOK_FILTER, CHAPTER_FILTER, SEARCH_BTN, CHAPTER_ARTICLE, 
         PREFERENCE_CONTROLS, RESET_BTN, DEFAULTS } from './const.js';
import { fetchBooks, fetchChapter } from './api.js';
import { normalizeBooks, normalizeChapter } from './normalize.js';
import { loadPreferences, savePreferences, applyPreferences, 
         syncRadioButtons } from './state.js';

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

export function handlePreferences() {
    // Handles the preferences and the reset button
    const chapterArticle = document.getElementById(CHAPTER_ARTICLE);
    const preferenceControls = document.getElementById(PREFERENCE_CONTROLS);
    const resetBtn = document.getElementById(RESET_BTN);

    const prefs = loadPreferences();
    applyPreferences(prefs, chapterArticle);
    syncRadioButtons(prefs);

    // Updates the preferences if they change
    preferenceControls.addEventListener('change', (event) => {
        const updatedPrefs = loadPreferences();

        if (event.target.name === 'theme') {
            updatedPrefs.theme = event.target.value;
        }
        if (event.target.name === 'font-size') {
            updatedPrefs.fontSize = event.target.value;
        }
        if (event.target.name === 'font-family') {
            updatedPrefs.fontFamily = event.target.value;
        }

        savePreferences(updatedPrefs);
        applyPreferences(updatedPrefs, chapterArticle);
    });

    // Resets the preferences 
    resetBtn.addEventListener('click', () => {
        savePreferences({...DEFAULTS});
        applyPreferences(DEFAULTS, chapterArticle);
        syncRadioButtons(DEFAULTS);
    });
}