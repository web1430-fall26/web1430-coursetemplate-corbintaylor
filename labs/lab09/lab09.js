// Lab 09 – Preference Panels and Saved UI Settings

// ─── Constants ────────────────────────────────────────────────────────────
const DEFAULTS = {
  theme:    'light',
  fontSize: 'medium',
  spacing:  'normal',
};
const STORAGE_KEY = 'reading-prefs';

const STORAGE_WARNING = document.getElementById('storage-warning');

// ─── Part 3: Preferences functions ───────────────────────────────────────

// loadPreferences()
// Reads from localStorage. Returns the stored preferences object,
// or a copy of DEFAULTS if nothing is stored or if JSON.parse fails.
function loadPreferences() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULTS };
  try {
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULTS };
  }
}

// savePreferences(prefs)
// Serializes the prefs object and writes it to localStorage.
function savePreferences(prefs) {
  // Saves the preferences using the STORAGE_KEY as the name, but also handles full storage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded. Preferences will not be saved in this session.');
      showStorageWarning();
    }
  }
}

function showStorageWarning() {
  if (STORAGE_WARNING) {
    STORAGE_WARNING.hidden = false;
  }
}

// applyPreferences(prefs, articleEl)
// Applies the preference object to articleEl by swapping CSS classes.
// Removes all existing theme-*, font-*, and spacing-* classes first,
// then adds the new ones.
function applyPreferences(prefs, articleEl) {
  articleEl.className = articleEl.className
    .split(' ')
    .filter(cls =>
      !cls.startsWith('theme-') &&
      !cls.startsWith('font-') &&
      !cls.startsWith('spacing-')
    )
    .join(' ');

  articleEl.classList.add(`theme-${prefs.theme}`);
  articleEl.classList.add(`font-${prefs.fontSize}`);
  articleEl.classList.add(`spacing-${prefs.spacing}`);
}

// syncRadioButtons(prefs)
// Sets the correct radio button to checked based on the prefs object.
function syncRadioButtons(prefs) {
  document.querySelector(`[name="theme"][value="${prefs.theme}"]`).checked = true;
  document.querySelector(`[name="font-size"][value="${prefs.fontSize}"]`).checked = true;
  document.querySelector(`[name="spacing"][value="${prefs.spacing}"]`).checked = true;
}

// ─── Part 4: Initialize ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const article = document.getElementById('article');
  const panel   = document.getElementById('preferences-panel');
  const resetBtn = document.getElementById('reset-btn');

  // 1. Load preferences and apply them immediately (before anything else renders)
  const prefs = loadPreferences();
  applyPreferences(prefs, article);
  syncRadioButtons(prefs);

  // 2. Listen for radio button changes
  // TODO: Add a 'change' listener to panel.
  // When a radio changes, load the current prefs, update the changed property,
  // save the updated prefs, and apply them.

  panel.addEventListener('change', (event) => {
    // Gets the updated preferences based on the radio element
    const updatedPrefs = loadPreferences();

    // Depending on the value updated, the preferences object is updated
    if (event.target.name === 'theme') {
      updatedPrefs.theme = event.target.value;
    }
    if (event.target.name === 'font-size') {
      updatedPrefs.fontSize = event.target.value;
    }
    if (event.target.name === 'spacing') {
      updatedPrefs.spacing = event.target.value;
    }

    // Saves the updated preferences object
    savePreferences(updatedPrefs);
    // Applies the new preferences
    applyPreferences(updatedPrefs, article);
  });

  // 3. Reset button
  // TODO: Add a 'click' listener to resetBtn.
  // Save DEFAULTS, apply DEFAULTS, and sync the radio buttons.

  resetBtn.addEventListener('click', () => {
    // Applies the defaults if the reset button is clicked
    // Uses the spread operator (...) to unpack the DEFAULTS object
    savePreferences({...DEFAULTS});
    applyPreferences(DEFAULTS, article);
    syncRadioButtons(DEFAULTS);
  });
});
