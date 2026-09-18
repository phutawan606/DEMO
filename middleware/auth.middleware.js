const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'กรุณาเข้าสู่ระบบก่อนใช้งาน' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_change_me', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Session หมดอายุ กรุณาเข้าสู่ระบบใหม่' });
    }
    req.user = user;
    next();
  });
};