const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Accept token from Authorization header: "Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// Optional: role-based guard factory
// Usage: router.get("/admin", verifyToken, requireRole("teacher"), handler)
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. Insufficient permissions.",
      });
    }
    next();
  };
};

module.exports = { verifyToken, requireRole };