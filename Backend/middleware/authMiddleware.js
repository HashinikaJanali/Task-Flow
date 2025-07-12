const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  
  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({ 
      success: false,
      message: "Authorization denied - no token provided" 
    });
  }

  // Extract token from Bearer schema
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user to request object
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ 
      success: false,
      message: "Authorization denied - invalid token" 
    });
  }
};

module.exports = auth;