const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  if (typeof bearerToken !== "undefined") {
    const bearer = bearerToken.split(" ");
    const token = bearer[1];
    const result = await jwt.verify(token, process.env.SECRET_KEY);
    if (result) {
      req.token = token;
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};
