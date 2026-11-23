// Initializes the chapter selection and search.

import { initBookSelect, handleChapterSelect, handleChapterSearch,
         handlePreferences } from './events.js';
import './style.css'

document.addEventListener('DOMContentLoaded', async () => {
    const books = await initBookSelect();
    handleChapterSelect(books);
    handleChapterSearch(books);
    handlePreferences();
});