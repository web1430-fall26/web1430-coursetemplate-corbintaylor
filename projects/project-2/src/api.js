const API_KEY = 'ov8cpeH0rC4-K15oTbj2D';
const API_ENDPOINT = 'https://rest.api.bible';
const NIV_BIBLE_ID = '78a9f6124f344018-01';

async function fetchChapter(chapterId) {
    const response = await fetch(`${API_ENDPOINT}/v1/bibles/${NIV_BIBLE_ID}/chapters/${chapterId}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=true&include-verse-numbers=true&include-verse-spans=false`, {
        headers: {
            'api-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching verse: ${response.status}`);
    }

    return response.json();
}

function normalizeChapter(chapter) {
    return {
        reference: chapter.data.reference,
        content: chapter.data.content,
        copyright: chapter.data.copyright,
        next: chapter.data.next.id,
        previous: chapter.data.previous.id
    };
}

const rawChapter = await fetchChapter('GEN.1');

console.log(normalizeChapter(rawChapter));