const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config/config");

exports.ensureAuthenticated = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Unauthorized user" });
  }

  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.decode(token, config.TOKEN_SECRET);

  if (payload.exp <= moment.unix()) {
    return res.status(401).json({ message: "The token has expired" });
  }

  req.user = payload.sub;
  next();
};
