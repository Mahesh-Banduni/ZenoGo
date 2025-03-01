const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// JWT authentication middleware
const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //console.log('Authorization Header:', authHeader); // Debug: Check the header value

  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  //console.log(token);
  const token1 = token.replace(/^"|"$/g, '');
  
  jwt.verify(token1, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      //console.log(err); 
      return res.status(403).json({ message: 'Invalid token.' });
    }
    
    req.user = user; // Attach the decoded token payload to request
    //console.log(user);
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = auth;