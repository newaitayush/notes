// app.js

// Dark Mode Logic
const toggleButton = document.getElementById('dark-mode-toggle');

// Check for saved user preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Toggle dark mode on button click
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// Notes App Logic
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

// Select the save button
const saveButton = document.querySelector('.save-btn');

// Function to check if the user is logged in
function checkLoginBeforeSave() {
    // Simulate a user login check
    const username = localStorage.getItem('username'); // Assume user data is stored in localStorage

    if (!username) {
        // Show alert if user is not logged in
        alert('Please log in to use this feature!');
        
        // Optionally redirect the user to the login page
        window.location.href = 'login.html';
    } else {
        // Save the note functionality (you can add your logic here)
        alert('Note saved successfully!'); // Placeholder alert
    }
}

// Add event listener to the save button
saveButton.addEventListener('click', checkLoginBeforeSave);
