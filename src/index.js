import express from 'express';
import passport from 'passport';
import config from './config.js'; // Import config
import { configurePassport } from './passportConfig.js'; // Import passport config
import { configureSession } from './sessionConfig.js'; // Import session config
import authRoutes from './routes/authRoutes.js'; // Import authentication routes
import userRoutes from './routes/userRoutes.js'; // Import user-related routes
import { errorHandler } from './middlewares.js'; // Import error handler middleware

const app = express();

// Initialize Passport.js
configurePassport();

// Use session configuration
app.use(configureSession());

// Initialize Passport.js session
app.use(passport.initialize());
app.use(passport.session());

// Body parsing middleware (for handling JSON and URL-encoded bodies)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the authentication routes under /api/v1/auth
app.use('/api/v1/auth', authRoutes);  // This prefix is used for all authentication-related routes, including Google login and logout.

// Use the user routes under /api/v1/users 
app.use('/api/v1/users', userRoutes); // This prefix is used for user-related routes like retrieving the profile or deleting the account.

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
