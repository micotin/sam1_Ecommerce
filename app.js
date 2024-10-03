const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');
const db = require('./config/dbConfig');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true
}));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Change this to true when using HTTPS
}));

// Set view engine
app.set('view engine', 'ejs');



const galleryRoutes = require('./routes/gallery');
const contactRoutes = require('./routes/contact');
const aboutRoutes = require('./routes/about');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');


app.use('/gallery', galleryRoutes);
app.use('/contact', contactRoutes);
app.use('/about', aboutRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});