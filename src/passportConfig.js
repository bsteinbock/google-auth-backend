import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config.js';

export const configurePassport = () => {
  // Configure Google OAuth2 strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: config.callbackURL,
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );

  // Serialize user info into the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize user info from the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
