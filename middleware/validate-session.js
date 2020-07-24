require("dotenv").config();

const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'Super secret', (err, decodeToken) => {
    if (!err && decodeToken) {
      User.findOne({ where: { id: decodeToken.id } })
        .then(user => {
          if (!user) throw err;
          req.user = user;
          return next();
        })
        .catch(err => next(err));
    } else {
      req.errors = err;
      return res.status(500).send('Not Authorized');
    }
  })
}

module.exports = validateSession;