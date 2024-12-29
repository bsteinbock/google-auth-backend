// authRoutes.js
import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

// Route to initiate Google OAuth2 login (/api/v1/auth/google)
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
  })
);

// callback route registered with Google (/api/v1/auth/google/callback)
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3002'); // Redirect to the React app after login
  }
);

// Route to check if the user is logged in (/api/v1/auth/user)
authRouter.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send('Not authenticated');
  }
});

// Route to log out the user (/api/v1/auth/logout)
authRouter.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.status(200).send('Logged out successfully');
  });
});

export default authRouter;
