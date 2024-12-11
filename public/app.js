const form = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
    });

    const note = await response.json();
    displayNote(note);
    form.reset();
});

async function fetchNotes() {
    const response = await fetch('http://localhost:5000/notes');
    const notes = await response.json();
    notes.forEach(displayNote);
}

function displayNote({ id, title, content }) {
    const li = document.createElement('li');
    li.textContent = `${title}: ${content}`;
    notesList.appendChild(li);
}

fetchNotes();
