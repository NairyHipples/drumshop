var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var User = require('../models/user');

//Save the user in the session
passport.serializeUser(function(user, done){
  done(null, user.id);
});

//If error
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

//Sign up strategy for creating a new user
passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
    process.nextTick(function(){
      User.findOne({'email': email}, function(err, user){
        if (err){
          return done(err);
        }
        if (user){
          //Flash message stored in session output in the view
          //Return null and false to not create a new user with
          //an email that already exists
          return done(null, false, {message: 'Email is already in use.'});
        }
        var newUser = new User();
        newUser.email = email;
        //Using the encryptPassword method
        newUser.password = newUser.generateHash(password);
        //Save the user
        newUser.save(function(err, result){
          if (err){
            return done(err);
          }
          return done(null, newUser);
        });
    });
  });
}));

//Sign in strategy for already existing users
passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  User.findOne({'email': email}, function(err, user){
    if (err){
      return done(err);
    }
    //Reverse this so it returns an error if it doesn't find a user
    if (!user){
      return done(null, false, {message: 'No user found.'});
    }
    //If password is invalid using helper function from the user model
    if (!user.validPassword(password)) {
      return done(null, false, {message: 'Invalid password.'});
    }
    return done(null, user);
  });
}));
