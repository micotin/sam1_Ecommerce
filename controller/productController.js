const db = require('../config/dbcon');

exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 9; // Number of products per page
        const offset = (page - 1) * limit;

        // Query to count total products
        const [countResult] = await db.query('SELECT COUNT(*) as total FROM products');
        const totalProducts = countResult[0].total;
        const totalPages = Math.ceil(totalProducts / limit);

        // Query to fetch products with pagination
        const [products] = await db.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset]);

        // Iterate over each product and handle the price conversion
        products.forEach((product) => {
            product.price = product.price ? parseFloat(product.price) : 0;
        });

        res.render('products', {
            title: 'Our Products',
            products,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: totalPages
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        // Query to fetch the product by ID
        const [productResult] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);

        if (productResult.length === 0) {
            return res.status(404).send('Product not found');
        }

        const product = productResult[0];
        product.price = parseFloat(product.price) || 0;

        // Query to fetch reviews for the product
        const [reviews] = await db.query('SELECT * FROM reviews WHERE productId = ?', [productId]);

        res.render('product', { 
            title: product.name, 
            product: product, 
            reviews: reviews 
        });

    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Error fetching product');
    }
};

// Vote for a review
exports.voteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        await db.query(
            'UPDATE reviews SET votes = votes + 1 WHERE id = ?',
            [reviewId]
        );

        const [rows] = await db.query('SELECT productId FROM reviews WHERE id = ?', [reviewId]);
        const productId = rows[0]?.productId; 
        return res.redirect(`/products/${productId}`); 
    } catch (error) {
        console.error('Error voting for review:', error);
        return res.status(500).render('error', { message: 'Unable to vote. Please try again.' });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const query = req.query.query; // Get the search query from the request
        const [products] = await db.query(
            'SELECT * FROM products WHERE name LIKE ?',
            [`%${query}%`] // Use wildcard for partial matching
        );

        // Iterate over each product and handle the price conversion
        products.forEach((product) => {
            product.price = product.price ? parseFloat(product.price) : 0;
        });

        // Render the search results using the product template
        res.render('products', { 
            title: `Search Results for "${query}"`,
            products,
            currentPage: 1, // Set current page to 1 for search results
            totalPages: 1, // Only one page of results
            hasNextPage: false,
            hasPreviousPage: false
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
};

