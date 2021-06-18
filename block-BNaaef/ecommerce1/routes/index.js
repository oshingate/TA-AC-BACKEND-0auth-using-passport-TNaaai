var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// sucess route
router.get('/success', function (req, res, next) {
  res.render('success', { user: req.user });
});

// failure route
router.get('/failure', function (req, res, next) {
  res.render('failure');
});

//github routes

router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  }
);
module.exports = router;
