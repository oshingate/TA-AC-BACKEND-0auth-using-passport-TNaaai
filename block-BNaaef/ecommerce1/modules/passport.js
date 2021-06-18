let passport = require('passport');
let User = require('../models/User');

var GitHubStrategy = require('passport-github').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: '/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      let arr = profile._json.name.split(' ');
      let fname = arr[0];
      let lname = arr[1];
      let userData = {
        firstName: fname,
        lastName: lname,
        email: profile._json.twitter_username,
        password: 'qwerty',
        city: profile._json.location,
        isAdmin: 'false',
      };

      console.log('userdata', userData);

      User.findOne({ email: profile._json.twitter_username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          User.create(userData, (err, created) => {
            if (err) return done(err);

            console.log('created', created);
            return done(null, created);
          });
        }
        done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
