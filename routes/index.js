var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});
/* GET home page. */
router.get('/', function (req, res, next) {
    //Load products from the database
    Product.find(function (err, docs) {
        //chunks so it can easily be styled in tables and rows
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
    });
});

//router set up for pushing a product to a session cart object
router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    //a new cart will be created each time an item is added to it
    //and passing the old cart with it if it exists
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});

    //using mongoose to find the productId
    Product.findById(productId, function (err, product) {
        //storing in the cart session object
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
});

//setting up router to show the cart in the view
router.get('/cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/cart', {products: null});
    }
    //fetching the items from the current cart
    var cart = new Cart(req.session.cart.items);
    res.render('shop/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;
