const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static('public')); // Serve static files from the public folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data

// Store registered users (in-memory for now)
const users = [];

// Redirect root to start page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));  // Serve start page
});

// Handle registration
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.json({ message: 'User already exists!' });
    }

    // Add new user to the simulated user list
    users.push({ name, email, password });
    res.json({ message: 'Registration successful! Please log in.', redirect: '/login.html' });
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the provided credentials match any user
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        res.json({ message: 'Login successful!', redirect: '/home.html' });
    } else {
        res.json({ message: 'Login failed! Incorrect email or password.' });
    }
});

// Age calculation route
app.post('/calculate-age', (req, res) => {
    const { day, month, year } = req.body;
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // Month is zero-based in JavaScript

    // Calculate the age in years
    let ageYears = today.getFullYear() - birthDate.getFullYear();

    // Calculate the difference in months and days
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust the month and day calculations if necessary
    if (ageDays < 0) {
        ageMonths--;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDays += previousMonth; // Add the number of days in the previous month
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    res.json({
        ageYears,
        ageMonths,
        ageDays
    });
});

// Serve home.html directly after login or registration
app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Serve login.html
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Send login page
});

// Serve register.html
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html')); // Send registration page
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
