// Constains the baseURL and result limit for API calls. Also contains the DOM references.

// API stuff
export const BASE_URL = `https://openlibrary.org/search.json`;
export const RESULT_LIMIT = 10;

// DOM references
export const results    = document.querySelector('#results');
export const loadingMsg = document.querySelector('.status-loading');
export const errorMsg   = document.querySelector('.status-error');
export const emptyMsg   = document.querySelector('.status-empty');
export const input      = document.querySelector('#search-input');
export const form       = document.querySelector('#search-form');