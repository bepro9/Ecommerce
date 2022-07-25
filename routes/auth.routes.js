const router = require("express").Router();
const User = require("../models/user.model");

const { registerUser, loginUser } = require("../controllers/auth.controller");

// Register 
router.post("/reg", registerUser);

// Login 
router.post("/login", loginUser);

module.exports = router;
