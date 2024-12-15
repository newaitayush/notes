document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Save user data (for now, simulate saving with localStorage)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful! You can now login.');
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Welcome back, ${user.name}!`);
        window.location.href = 'home.html'; // Redirect to notes page
    } else {
        alert('Invalid email or password.');
    }
});

const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check if dark mode is already enabled (saved in localStorage)
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.classList.add('dark-mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('dark-mode');

    // Save preference in localStorage
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// Simulate fetching user name from localStorage after login
document.addEventListener('DOMContentLoaded', () => {
    const usernameSpan = document.getElementById('username');
    const notesList = document.getElementById('notesList');
    const noteInput = document.getElementById('noteInput');
    const saveNoteButton = document.getElementById('saveNote');
    const logoutButton = document.getElementById('logout');

    // Fetch username from localStorage (set during login)
    const username = localStorage.getItem('username') || 'User';
    usernameSpan.textContent = username;

    // Fetch notes from localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Display saved notes
    const displayNotes = () => {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.textContent = note;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.onclick = () => {
                notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                displayNotes();
            };
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    };

    displayNotes();

    // Save new note
    saveNoteButton.addEventListener('click', () => {
        const note = noteInput.value.trim();
        if (note) {
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            displayNotes();
            noteInput.value = ''; // Clear input
        } else {
            alert('Please write a note before saving.');
        }
    });

    // Logout functionality
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('username'); // Clear user session
        window.location.href = 'login.html'; // Redirect to login
    });
});

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
