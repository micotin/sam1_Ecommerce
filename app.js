const express = require('express');
const path = require('path');
const db = require('./config/dbcon'); 
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

// Set up session middleware
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');
const searchRoutes = require('./routes/search');

// Use routes
app.use('/', homeRoutes); 
app.use('/products', productRoutes); 
app.use('/', userRoutes); 
app.use('/search', searchRoutes);

// User authentication routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server initiated at http://localhost:3000');
});
