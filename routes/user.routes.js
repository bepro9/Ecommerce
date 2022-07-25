const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/auth.middleware");

// Admin Access : List users
router.get("/users", verifyTokenAndAdmin, getUsers);

// Admin Access : Single User
router.get("/:id", verifyTokenAndAdmin, getUser);

// Update user : Normal User
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// Delete User : Normal User
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

module.exports = router;
