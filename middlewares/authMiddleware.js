const jwt = require("jsonwebtoken");

const authn = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;
    req.body.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const authorize = (requiredRoles) => {
    return (req, res, next) => {
      try {
        // Assuming req.user is set after authentication
        const userRole = req.body.userRole;
  
        if (!requiredRoles.includes(userRole)) {
          return res.status(403).json({ message: 'Access denied' });
        }

        next(); // User is authorized, proceed to the next middleware or route handler
      } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  };

module.exports = { authn, authorize }
