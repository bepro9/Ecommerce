const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
  try {
    const Authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (Authorization) {
      const secretKey = JWT_SECRET_KEY;
      const verificationResponse = await jwt.verify(Authorization, secretKey);
      const userId = verificationResponse.id;
      const findUser = await User.find({ _id: userId });

      if (findUser) {
        req.user = findUser[0];
        next();
      } else {
        return res.status(401).json({ message: "Invalid Token!" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "You are not authorized to access" });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// Normal User with logged IN and Verifiedtoken
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: " You are not Admin or Invalid ID!" });
    }
  });
};

// Admin & verify token
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else res.status(403).json("message: You are not Admin");
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
