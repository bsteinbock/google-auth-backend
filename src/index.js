import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session'; // Import express-session
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import apiRoutes from './routes/apiRoutes.js'; // Import the API routes

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
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Set secure to true only in production
      httpOnly: true,
    },
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Use the routes defined in apiRoutes.js
app.use('/api/v1', apiRoutes);

// Start the server
app.listen(5050, () => {
  console.log('Server running on http://localhost:5050');
});
