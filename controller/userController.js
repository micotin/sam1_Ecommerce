const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).render('signup', { title: 'Sign Up', error: 'User already exists!' });
        }

        // Create the user
        await userModel.createUser(name, email, phone, password);
        return res.redirect('/login'); // Redirect to login after signup
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).render('signup', { title: 'Sign Up', error: 'Server error during signup' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.render('login', { title: 'Login', error: 'Invalid email or password!' });
        }

        // Compare the provided password with the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render('login', { title: 'Login', error: 'Invalid email or password!' });
        }

        // Successful login
        req.session.userId = user.id; // Store user ID in session 
        return res.redirect('/home'); // Redirect to home after successful login
    } catch (error) {
        console.error('Login error:', error);
        return res.render('login', { title: 'Login', error: 'Server error during login' });
    }
};

module.exports = {
    signup,
    login
};
