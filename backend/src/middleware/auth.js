import jwt from 'jsonwebtoken';  // Import toàn bộ module jsonwebtoken
import dotenv from 'dotenv';      // Import dotenv

dotenv.config(); // Load environment variables

// Destructure verify từ jwt
const { verify } = jwt;

// Middleware để kiểm tra JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};

// Middleware để kiểm tra quyền hạn dựa trên vai trò
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};


export { authenticateToken, authorizeRole };
