export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Middleware to check if the user is authenticated
export const checkAuthentication = (req, res, next) => {
  // Check if the user is authenticated (Passport adds this method)
  if (req.isAuthenticated()) {
    return next();  // If authenticated, proceed to the next route handler
  } else {
    // If not authenticated, return a 401 Unauthorized status
    res.status(401).send('Not authenticated');
  }
};
