// Normalizes the chapter and books provided by the API.

export function normalizeChapter(chapter) {
    // Normalizes a chapter object provided by the API
    return {
        reference: chapter.data.reference || 'No reference available.',
        content: chapter.data.content || 'No content available.',
        copyright: chapter.data.copyright || 'No copyright information available.',
        next: chapter.data.next.id || null,
        previous: chapter.data.previous.id || null
    };
}

export function normalizeBooks(books) {
    // Normalizes the array of books in the NIV Bible provided by the API
    return books.data.map(book => ({
        reference: book.chapters[0].bookId || 'Reference unavailable',
        name: book.nameLong || 'Name unavailable',
        chapterCount: book.chapters.length - 1 || 'Chapter count unavailable'
    }));
}