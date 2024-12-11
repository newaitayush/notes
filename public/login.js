document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            localStorage.setItem('token', data.token); // Save JWT token
            window.location.href = 'notes.html'; // Redirect to notes page
        } else {
            alert(data.message || 'Login failed!');
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    }
});
