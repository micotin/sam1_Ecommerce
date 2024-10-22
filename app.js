const express = require('express');
const path = require('path');
const db = require('./config/dbConfig');
const app = express();
const session = require('express-session');

const userController = require('./controller/userController');
const homeController = require('./controller/homeController');

// Set up views and public static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Removed session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
// Routes
const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
//const reviewRoutes = require('./routes/reviews');
const searchRoutes = require('./routes/search');
const userRoutes = require('./routes/user');

// Public routes (no authentication needed)
app.use('/home', homeRoutes); 
app.use('/products', productRoutes);
//app.use('/products/${productId}/reviews', reviewRoutes);
app.use('/search', searchRoutes);
app.use('/', userRoutes);

app.get('/home', homeController.getHomePage);

app.post('/signup', userController.signup);
app.post('/login', userController.login);

app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' }); // Render your home page
});

// Listen on port 3000
app.listen(3003, () => {
    console.log('Server initiated at http://localhost:3003');
});
