const db = require('../config/dbConfig');

const homeController = {
    getHomePage: async (req, res) => {
        try {
            const [products] = await db.query('SELECT id, name, price, image_url FROM products');
            const [topReviews] = await db.query(`
                SELECT r.name AS reviewerName, r.rating, r.comment, r.votes, r.created_at, p.name AS productName, r.productId 
                FROM reviews r 
                JOIN products p ON r.productId = p.id 
                ORDER BY r.votes DESC 
                LIMIT 3
            `);
            

            // Ensure prices are numbers
            products.forEach(product => {
                product.price = Number(product.price);
            });

            // Render the home page with products and reviews
            res.render('home', { title: 'Welcome to Sam1 Flower Shop', products, topReviews });
        } catch (error) {
            console.error('Error fetching products or reviews:', error);
            res.status(500).send('Server error');
        }
    }
};

module.exports = homeController;
