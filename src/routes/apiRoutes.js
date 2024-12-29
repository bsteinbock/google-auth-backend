// apiRoutes.js
import express from 'express';
import passport from 'passport';

// Route to initiate Google OAuth2 login
const googleAuth = express.Router();

googleAuth.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
  })
);

// Google OAuth2 callback route
googleAuth.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3002'); // Redirect to the React app after login
  }
);

// Route to check if the user is logged in
googleAuth.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send('Not authenticated');
  }
});

// Route to log out the user
googleAuth.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.status(200).send('Logged out successfully');
  });
});

export default googleAuth;
