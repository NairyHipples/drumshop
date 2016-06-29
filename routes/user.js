var express = require('express');
var router = express.Router();
var passport = require('passport');

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

router.get('/signup', function(req, res, next) {
    //Retrieve validation error from flash package and pass it to the view
    var messages = req.flash('error');
    //Output message if email is already in use
    res.render('user/signup', {hasErrors: messages.length > 0, messages: messages});
});

//Using the signup strategy
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

//define the sign in route
router.get('/signin', function(req, res, next) {
    //Retrieve validation error from flash package and pass it to the view
    var messages = req.flash('error');
    //Output message if email is already in use
    res.render('user/signin', {hasErrors: messages.length > 0, messages: messages});
});

//Using the signin strategy
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));
//defining logout
router.get('/logout', function(req, res, next) {
    req.logout();
    return res.redirect('/');
});

//add profile route to I can redirect user if successful signup
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

module.exports = router;

//My own middleware function to restrict some links to only be visible for LOGGED IN users only
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
