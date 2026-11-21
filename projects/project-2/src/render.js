// Renders the books and chapter to the DOM.

import { BOOK_FILTER, CHAPTER_FILTER, CHAPTER_CONTAINER, CHAPTER_ARTICLE, 
         CHAPTER_TITLE, CHAPTER_CONTENT, CHAPTER_COPYRIGHT, LOADING_MSG,
         ERROR_MSG, EMPTY_MSG } from './const.js';

const bookSelect = document.getElementById(BOOK_FILTER);
const chapterSelect = document.getElementById(CHAPTER_FILTER);
const chapterContainer = document.getElementById(CHAPTER_CONTAINER);
const loadingMsg = document.getElementById(LOADING_MSG);
const errorMsg = document.getElementById(ERROR_MSG);
const emptyMsg = document.getElementById(EMPTY_MSG);

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
    chapterSelect.textContent = '';

    let i = 1;
    for (i; i <= chapterCount; ++i) {
        const chapterOption = document.createElement('option');
        chapterOption.textContent = i;
        chapterOption.value = i;
        chapterSelect.append(chapterOption);
    }
}

export function renderChapter(chapter) {
    // Clears the chapter container and renders a new chapter
    chapterContainer.textContent = '';

    const chapterArticle = document.createElement('article');
    chapterArticle.classList.add(CHAPTER_ARTICLE);

    const chapterTitle = document.createElement('h2');
    chapterTitle.classList.add(CHAPTER_TITLE);
    chapterTitle.textContent = chapter.reference;

    const chapterContent = document.createElement('p');
    chapterContent.classList.add(CHAPTER_CONTENT);
    chapterContent.textContent = chapter.content;

    const chapterCopyright = document.createElement('p');
    chapterCopyright.classList.add(CHAPTER_COPYRIGHT);
    chapterCopyright.textContent = chapter.copyright;

    chapterArticle.append(chapterTitle, chapterContent, chapterCopyright);
    chapterContainer.append(chapterArticle);
}

export function showLoading() {
    // Shows the loading message and hides the other messages
    loadingMsg.hidden = false;
    errorMsg.hidden = true;
    emptyMsg.hidden = true;
}

export function showError(message) {
    // Displays the error message and hides the others
    errorMsg.textContent = message;

    errorMsg.hidden = false;
    loadingMsg.hidden = true;
    emptyMsg.hidden = true;
}

export function showEmpty() {
    // Shows the empty message and hides the others
    emptyMsg.hidden = false;
    loadingMsg.hidden = true;
    errorMsg.hidden = true;
}

export function hideMessages() {
    // Hides all the messages
    loadingMsg.hidden = true;
    errorMsg.hidden = true;
    emptyMsg.hidden = true;
}

export function clearChapter() {
    // Clears the chapter container
    chapterContainer.textContent = '';
}