// Lab 08 – Open Library Book Search
// API endpoint: https://openlibrary.org/search.json?title=[query]&limit=12
// No API key required.

// ─── DOM references ───────────────────────────────────────────────────────
const form          = document.getElementById('search-form');
const input         = document.getElementById('search-input');
const resultsRegion = document.getElementById('results-region');

// ─── Part 2: API and data functions ──────────────────────────────────────

// fetchBooks(query)
// Async function that:
//   1. Fetches the Open Library search endpoint for the given query (encodeURIComponent)
//   2. Checks response.ok — if false, throws new Error(`Request failed: ${response.status}`)
//   3. Parses and returns the JSON
// Response shape: { numFound: N, docs: [ { title, author_name, first_publish_year }, ... ] }
async function fetchBooks(query) {
  // Fetches books based on the query by inserting them into the URL
  const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=12`);

  // Checks for responses that resolve, but have errors
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  } 

  // Returns a Promise for the JSON of the data
  return await response.json();
}

// normalizeBooks(docs)
// Accepts the docs array from the API response.
// Returns a new array of plain objects with guaranteed properties:
//   { title, author, year }
// Provide defaults for missing fields:
//   title:  doc.title || 'Unknown Title'
//   author: doc.author_name?.[0] ?? 'Unknown Author'
//   year:   doc.first_publish_year || 'Unknown Year'
function normalizeBooks(docs) {
  // Returns a formatted object
  return docs.map(doc => ({
    // Picks the title if it exists, otherwise 'Unknown Title' is used
    title: doc.title || 'Unknown Title',
    // Uses a ternary operator to check if the author exists. If it does,
    // the first author (might be from a list) is chosen; otherwise 'Unknown Author'
    author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
    // Same strategy for the title
    year: doc.first_publish_year || 'Unknown Year',
  }));
}


// ─── Part 3: UI state functions ───────────────────────────────────────────
// All functions clear resultsRegion and insert a new element using
// createElement + textContent (no innerHTML).

function showLoading() {
  // Clear resultsRegion, append a <p class="status-loading"> reading "Searching for books…"
  
  // Clears the results region
  resultsRegion.textContent = "";

  // Creates the loading message as a <p>
  const loadingMsg = document.createElement('p');
  loadingMsg.classList.add('status-loading');
  loadingMsg.textContent = "Searching for books...";

  // Appends the <p> to the results region
  resultsRegion.append(loadingMsg);
}

function showError(message) {
  // Clear resultsRegion, append a <p class="status-error"> with the provided message

  // Displays an error message
  
  resultsRegion.textContent = "";

  const errorMsg = document.createElement('p');
  errorMsg.classList.add('status-error');
  // Uses the message parameter to create the error message
  errorMsg.textContent = message;

  resultsRegion.append(errorMsg);
}

function showEmpty() {
  // Clear resultsRegion, append a <p class="status-empty"> reading "No books found. Try a different search."
  
  // Displays message for when no results are found

  resultsRegion.textContent = "";

  const emptyMsg = document.createElement('p');
  emptyMsg.classList.add('status-empty');
  emptyMsg.textContent = "No books found. Try a different search.";

  resultsRegion.append(emptyMsg);
}

function renderBooks(books) {
  // Clear resultsRegion.
  // For each book, create an <article class="book-card"> containing:
  //   - title in an <h2>
  //   - author in a <p class="book-author">
  //   - year in a <p class="book-year">
  // Append all cards to resultsRegion.
  
  resultsRegion.textContent = "";

  books.forEach(book => {
    // Creates book cards for each book in the object array
    const bookCard = document.createElement('article');
    bookCard.classList.add('book-card');

    const title = document.createElement('h2');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.classList.add('book-author');
    author.textContent = book.author;

    const year = document.createElement('p');
    year.classList.add('book-year');
    year.textContent = book.year;

    // Appends the elements to the card, then appends the card to the results region
    bookCard.append(title, author, year);
    resultsRegion.append(bookCard);
  });

  
}

// ─── Part 4: Search handler ───────────────────────────────────────────────
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showError('Please enter a search term.');
    return;
  }

  showLoading();

  try {
    // TODO: call fetchBooks, normalizeBooks, then renderBooks or showEmpty
    
    // Calls fetchBooks asynchronously to get the data
    const data = await fetchBooks(query);
    const books = normalizeBooks(data.docs);

    // Checks if there was no results before rendering the books
    if (books.length === 0) {
      showEmpty();
    } else {
      renderBooks(books);
    }
  } catch (error) {
    showError('Unable to load results. Please check your connection and try again.');
    console.error(error);
  }
});
