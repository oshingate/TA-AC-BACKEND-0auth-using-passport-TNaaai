var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//sucess route
router.get('/success', function (req, res, next) {
  res.render('success');
});

//failure route
router.get('/failure', function (req, res, next) {
  res.render('failure');
});

//passport route

router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/failure',
  }),
  function (req, res) {
    //success redirect
    res.redirect('/success');
  }
);

module.exports = router;
