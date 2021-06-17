var passport = require('passport');
var User = require('../models/User');
var GitHubStrategy = require('passport-github').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      //
      console.log(profile);
      let ProfileData = {
        name: profile.displayName,
        username: profile.username,
        photo: profile._json.avatar_url,
        email: profile._json.email,
      };

      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(ProfileData, (err, created) => {
            if (err) return done(err);
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

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
