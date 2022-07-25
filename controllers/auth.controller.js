const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email && !password) {
      throw new Error("All Input Required");
    }

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      throw new Error("User already exists");
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(201).json({
      status: "Success",
      message: newUser,
    });
  } catch (Error) {
    res.status(500).json({
      status: "Failed",
      message: Error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      throw new Error("User does not exists");
    }
    const checkPassoword = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    if (!checkPassoword) {
      throw new Error("Passoword does not match");
    }

    // generate accessToken for User
    const accessToken = jwt.sign(
      {
        id: userExist._id,
        isAdmin: userExist.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    const { password, ...others } = userExist._doc;
    res.status(200).json({
      status: "Successfully logged in",
      message: others,
      token: accessToken,
    });
  } catch (Error) {
    res.status(401).json({
      status: "Failed",
      message: Error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
