const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart,
} = require("../controllers/cart.controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/auth.middleware");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, createCart);

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

// GET User Cart
router.get("/find/:userId", verifyTokenAndAuthorization, getCart);

// ADMIN: Get ALL cart
router.get("/", verifyTokenAndAdmin, getAllCart);

module.exports = router;
