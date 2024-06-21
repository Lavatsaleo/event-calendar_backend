const roleMiddleware = (roles) => {
    return (req, res, next) => {
      const userRole = req.userRole; // Assuming req.userRole is set in the authMiddleware
      if (roles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    };
  };
  
  module.exports = roleMiddleware;
  