// Manages the preferences and the localStorage data.

import { DEFAULTS, STORAGE_KEY } from './const.js';
import { showStorageWarning } from './render.js';

export function loadPreferences() {
    // Fetches the preferences from localStorage and returns them as an object.
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    try {
        return JSON.parse(raw);
    } catch {
        return { ...DEFAULTS };
    }
}

export function savePreferences(prefs) {
    // Saves the preferences using the STORAGE_KEY or displays a warning
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
        if (error.name === 'QuotaExceededError') {
            console.warn('localStorage is full. Preferences will not be saved in this session.');
            showStorageWarning();
        }
    }
}

export function applyPreferences(prefs, articleEl) {
    // Applies the preferences to the article element for the chapter
    if (!prefs) return;
    articleEl.className = articleEl.className
        .split(' ') // Splits the class name into an array
        .filter(cls => // Strips the theme, font size, and font family
            !cls.startsWith('theme-') &&
            !cls.startsWith('font-size-') &&
            !cls.startsWith('font-family-')
        )
        .join(' '); // Joins the class names back into a string

    articleEl.classList.add(`theme-${prefs.theme}`);
    articleEl.classList.add(`font-size-${prefs.fontSize}`);
    articleEl.classList.add(`font-family-${prefs.fontFamily}`);
}

export function syncRadioButtons(prefs) {
    // Syncs the radio buttons based on localStorage preferences
    if (!prefs) {
        prefs = DEFAULTS;
    }

    document.querySelector(`[name="theme"][value="${prefs.theme}"]`).checked = true;
    document.querySelector(`[name="font-size"][value="${prefs.fontSize}"]`).checked = true;
    document.querySelector(`[name="font-family"][value="${prefs.fontFamily}"]`).checked = true;
}