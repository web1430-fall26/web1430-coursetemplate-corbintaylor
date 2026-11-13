// Normalizes books.

export function normalizeBooks(docs) {
    // Returns an array of books 
    return docs.map(doc => ({
        title: doc.title || 'Unknown Title',
        author: doc.author_name?.[0] ?? 'Unknown Author',
        year: doc.first_publish_year || 'Unknown Year'
    }));
}