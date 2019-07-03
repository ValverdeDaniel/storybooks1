const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy ({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //this is the callback that you registered with google when you registered your app and received id and secret
      callbackURL: '/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
    })
  )
}
