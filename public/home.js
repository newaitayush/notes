// Select the elements
const noteInput = document.querySelector('textarea'); // Text area for input
const saveButton = document.querySelector('.save-btn'); // Save button
const savedNotesContainer = document.querySelector('#savedNotes'); // Saved notes display container

// Function to load notes from localStorage and display them
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || []; // Load saved notes or initialize an empty array
    savedNotesContainer.innerHTML = ''; // Clear the display

    // Display each note
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = note;
        noteDiv.classList.add('note-item');
        noteDiv.style.margin = '10px 0';

        // Optional: Add a delete button for each note
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.color = 'red';
        deleteButton.onclick = () => deleteNote(index);

        noteDiv.appendChild(deleteButton);
        savedNotesContainer.appendChild(noteDiv);
    });
}

// Function to save a new note
function saveNote() {
    const noteText = noteInput.value.trim(); // Get input value and trim whitespace

    if (noteText) { // Check if the input is not empty
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText); // Add the new note to the array
        localStorage.setItem('notes', JSON.stringify(notes)); // Save back to localStorage

        noteInput.value = ''; // Clear the text area
        loadNotes(); // Reload the notes display
    } else {
        alert('Please write something before saving.'); // Show alert if input is empty
    }
}

// Function to delete a note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1); // Remove the note at the given index
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes(); // Reload the notes
}

// Add event listener to the save button
saveButton.addEventListener('click', saveNote);

// Load notes when the page is loaded
document.addEventListener('DOMContentLoaded', loadNotes);

// Select the logout button
const logoutButton = document.querySelector('#logout');

// Function to handle logout
function handleLogout() {
    // Show logout success alert
    alert('You have successfully logged out.');
    window.location.href = 'index.html'
    // Clear user data from localStorage
    localStorage.removeItem('username');

    // Redirect to the login page
    window.location.href = 'login.html';
}

// Add event listener to the logout button
logoutButton.addEventListener('click', handleLogout);
