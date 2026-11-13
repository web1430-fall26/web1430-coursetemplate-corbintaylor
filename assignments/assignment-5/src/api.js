// Handles all API calls.

import { baseURL } from './constants.js';
import { showError } from './render.js';

export async function fetchBooks(title) {
    // Fetches the books based on the title and returns a JSON file
    const url = `${baseURL}?title=${encodeURIComponent(title)}&limit=10`;

    const response = await fetch(url);

    if (!response.ok) {
        showError(`Server request failed: ${response.status}`);
        throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
}