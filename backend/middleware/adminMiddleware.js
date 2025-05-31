const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
};

module.exports = { isAdmin };
