const jwt = require('jsonwebtoken');
const tokenKey = require("../tokenKey");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, tokenKey.key);
    const account = decodedToken.account;


    if (req.body.account && req.body.account !== account) {
      res.json({pass:false})
      return;
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};