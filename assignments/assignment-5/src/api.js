// Handles all API calls.

import { BASE_URL, RESULT_LIMIT } from './constants.js';

export async function fetchBooks(title) {
    // Fetches the books based on the title and returns a JSON file
    const url = `${BASE_URL}?title=${encodeURIComponent(title)}&limit=${RESULT_LIMIT}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
}