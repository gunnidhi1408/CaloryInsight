// centralized error handler for the express app
// catches errors from controllers and sends proper JSON responses
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // mongoose validation errors (e.g. required field missing)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  // duplicate key error - usually means email already registered
  if (err.code === 11000) {
    return res.status(400).json({ message: 'That email is already registered' });
  }

  // bad jwt token
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // fallback for everything else
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Something went wrong on the server'
  });
};

export default errorHandler;
