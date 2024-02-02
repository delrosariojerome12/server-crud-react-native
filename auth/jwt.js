const {sign, verify} = require("jsonwebtoken");
const {jwt} = require("../config/db.config");

const createTokens = (user) => {
  const accessToken = sign({username: user.username, id: user.id}, jwt);

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accesToken = req.cookies["access-token"];
  if (!accesToken) {
    return res.status(400).json({msg: "No Access token"});
  }
  try {
    const validToken = verify(accesToken, jwt);
    if (validToken) {
      req.authenticate = tre;
      return next();
    }
  } catch (error) {
    return res.status(400).json({msg: "User not authenticated.", error});
  }
};

module.exports = {createTokens, validateToken};
