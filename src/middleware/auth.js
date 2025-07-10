const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contiene id, email, role
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Acceso solo para administradores" });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
