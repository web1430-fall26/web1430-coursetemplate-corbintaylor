import { fetchBooks } from './api.js';
import { normalizeBooks } from './normalize.js';
import { renderBookOptions } from './render.js';
import { handleChapterSelect } from './events.js';
import './style.css'

document.addEventListener('DOMContentLoaded', async () => {
    const books = await fetchBooks();
    const normalizedBooks = normalizeBooks(books);

    renderBookOptions(normalizedBooks);
    handleChapterSelect(normalizedBooks);
});