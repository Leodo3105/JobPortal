import jwt from 'jsonwebtoken'; // Import toàn bộ module jsonwebtoken
import dotenv from 'dotenv';     // Import dotenv

dotenv.config(); // Load environment variables

const { verify } = jwt; // Destructure verify từ jwt

// Middleware để kiểm tra JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    console.error('No token provided in the request');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded);
    req.user = decoded; // Gán thông tin token vào req.user để sử dụng trong các middleware khác
    next();
  } catch (err) {
    console.error('Error decoding token:', err);

    // Xử lý lỗi cụ thể hơn
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expired. Please log in again.' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token. Please log in again.' });
    } else if (err.name === 'NotBeforeError') {
      return res.status(403).json({ message: 'Token not active yet.' });
    } else {
      return res.status(500).json({ message: 'An error occurred while processing the token.' });
    }
  }
};

// Middleware để kiểm tra quyền hạn dựa trên vai trò
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.error('Unauthorized access. User not authenticated.');
      return res.status(401).json({ message: 'Unauthorized. User not authenticated.' });
    }

    if (!roles.includes(req.user.role)) {
      console.warn(`Access denied. User role '${req.user.role}' does not have sufficient permissions.`);
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    console.log(`User role '${req.user.role}' authorized successfully.`);
    next();
  };
};

export { authenticateToken, authorizeRole };
