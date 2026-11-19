// Performs the API calls for a specific chapter, the available books, and the chapter count.

import { API_KEY, API_ENDPOINT, NIV_BIBLE_ID } from './const.js';

export async function fetchChapter(chapterId) {
    // Fetches a chapter based on a chapter ID
    if (!chapterId) return;

    const response = await fetch(`${API_ENDPOINT}/v1/bibles/${NIV_BIBLE_ID}/chapters/${chapterId}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=true&include-verse-numbers=true&include-verse-spans=false`, {
        headers: {
            'api-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching chapter: ${response.status}`);
    }

    return response.json();
}

export async function fetchBooks() {
    // Fetches the available books in the NIV Bible
    const response = await fetch(`${API_ENDPOINT}/v1/bibles/${NIV_BIBLE_ID}/books?include-chapters=true&include-chapters-and-sections=false`, {
        headers: {
            'api-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching books: ${response.status}`);
    }

    return response.json();
}