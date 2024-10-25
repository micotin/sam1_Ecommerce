const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); 
const bcrypt = require('bcrypt');
const User = require('../model/userModel');

// GET login page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', error: null }); // Include error as null when rendering the login page
});

// POST login action
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email); // Call the findByEmail method on the User model

        if (user) {
            // Check password
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return res.redirect('/home'); // Redirect to homepage after login
            } else {
                return res.render('login', { title: 'Login', error: 'Invalid email or password' }); // Render with error
            }
        } else {
            return res.render('signup', { title: 'Sign Up', error: 'Account does not exist. Sign Up first.' }); // Render signup with error
        }
    } catch (err) {
        console.error('Login error:', err); // Log the error
        return res.render('login', { title: 'Login', error: 'Server Error' }); // Render with server error
    }
});

// GET signup page
router.get('/', (req, res) => {
    res.render('signup', { title: 'Sign Up', error: null }); // Include error as null when rendering the signup page
});

// POST signup action
router.post('/', userController.signup);

module.exports = router;
