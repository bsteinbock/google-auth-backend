import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session'; // Import express-session
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();

// Configure the passport Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5050/api/v1/auth/google/callback',
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

// Use express-session to handle session management
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use your session secret here
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }, // For development, set `secure` to false
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Route to initiate Google OAuth2 login
app.get(
  '/api/v1/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
  })
);

// Google OAuth2 callback route
app.get(
  '/api/v1/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3002'); // Redirect to the React app after login
  }
);

// Route to check if the user is logged in
app.get('/api/v1/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send('Not authenticated');
  }
});

// Start the server
app.listen(5050, () => {
  console.log('Server running on http://localhost:5050');
});
