// All event listeners.

import { handleExpand, handleSubmit } from './btn-handlers.js';

const input = document.querySelector('#search-input');
const form  = document.querySelector('#search-form');
const results = document.querySelector('#results');

export function initBookSearch() {
    results.addEventListener('click', (event) => {
        handleExpand(event);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit(input.value);
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Renders an initial dataset
        handleSubmit('Lord of the Flies');
    });
}