import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from the .env file

// Environment variable validation
const config = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  callbackURL:
    process.env.CALLBACK_URL ||
    'http://localhost:5050/api/v1/auth/google/callback',
  port: process.env.PORT || 5050,
};

if (
  !config.googleClientID ||
  !config.googleClientSecret ||
  !config.sessionSecret
) {
  throw new Error('Missing required environment variables');
}

export default config;
