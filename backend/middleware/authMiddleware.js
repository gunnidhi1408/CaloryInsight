import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// middleware to verify jwt and attach user to request
const protect = async (req, res, next) => {
  let token;

  // look for token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // extract token (format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // verify and decode
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find user and attach to request (without password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token is invalid or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

export { protect };
