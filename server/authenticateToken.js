import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const access_token = req.cookies.access_token;
  if (!access_token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or expired' });
  }

  jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = user;
    console.log('User authenticated:', user);
    next();
  });
};

export default authenticateToken;
