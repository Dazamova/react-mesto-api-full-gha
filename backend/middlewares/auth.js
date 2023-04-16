const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err'); // 401

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = req.cookies.jwt;
  try {
    const payload = jwt.verify(token, 'ya-practicum');
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};
