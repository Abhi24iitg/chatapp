const jwt = require("jsonwebtoken");
const User = require("../Models/User.js");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json("Not authrorized,token failed");
    }
  }
  if (!token) {
    res.status(401).json("Not authorized, no token");
  }
};

module.exports = protect;
