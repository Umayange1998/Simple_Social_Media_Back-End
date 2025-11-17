const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY; 

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Access denied, token missing!" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user; // attach decoded user info to req
    next();
  });
};

module.exports = authenticateToken;
