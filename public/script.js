// Handle the signup form submission
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Signup successful! Please log in.');
            window.location.href = '/login.html';
        } else {
            alert(`Signup failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Handle the login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful!');
            window.location.href = '/dashboard.html'; // Redirect to dashboard or notes page
        } else {
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }
});
