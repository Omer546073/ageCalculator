// User registration form submission
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('register-result').textContent = data.message;
        if (data.redirect) {
            // Redirect to login page after successful registration
            window.location.href = data.redirect;
        }
    })
    .catch(err => {
        document.getElementById('register-result').textContent = 'Registration failed.';
    });
});

// User login form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('login-result').textContent = data.message;
        if (data.redirect) {
            // Redirect to home page after successful login
            window.location.href = data.redirect;
        }
    })
    .catch(err => {
        document.getElementById('login-result').textContent = 'Login failed.';
    });
});

// Age calculation form submission
document.getElementById('age-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    fetch('/calculate-age', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, month, year })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = `You are ${data.age} years old.`;
    })
    .catch(err => {
        document.getElementById('result').textContent = 'Failed to calculate age.';
    });
});
