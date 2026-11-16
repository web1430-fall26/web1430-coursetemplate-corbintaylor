// All event listeners.

import { handleExpand, handleSubmit } from './btn-handlers.js';
import { results, form, input } from './constants.js';

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