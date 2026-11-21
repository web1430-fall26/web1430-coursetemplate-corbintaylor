import { initBookSelect, handleChapterSelect, handleChapterSearch } from './events.js';
import './style.css'

document.addEventListener('DOMContentLoaded', async () => {
    const books = await initBookSelect();
    handleChapterSelect(books);

    handleChapterSearch(books);
});