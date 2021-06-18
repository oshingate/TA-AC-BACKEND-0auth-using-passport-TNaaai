var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session.isAdmin);
  if (req.user.isAdmin === 'true') {
    return res.render('adminHomePage');
  } else if (req.user.isAdmin === 'false') {
    let error = req.flash('error')[0];
    return res.render('clientHomePage', { error });
  } else {
    req.flash('error', 'you must login first');
    return res.redirect('/users/login');
  }
});

module.exports = router;
