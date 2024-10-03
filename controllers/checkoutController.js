exports.getCheckoutPage = (req, res) => {
    if (!req.session.cart || req.session.cart.length === 0) {
      return res.redirect('/cart');
    }
    res.render('checkout', { title: 'Checkout' });
  };
  
  exports.processCheckout = (req, res) => {
    req.session.cart = [];
    res.render('confirmation', { title: 'Order Confirmation' });
  };