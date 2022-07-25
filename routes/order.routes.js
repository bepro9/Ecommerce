const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/auth.middleware");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrder,
  getMonthlyIncome,
} = require("../controllers/order.controller");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, createOrder);

// UPDATE : Only Admin can update the Placed order
router.put("/:id", verifyTokenAndAdmin, updateOrder);

// DELETE : Only Admin can delete the Placed order
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

// GET User Order
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrders);

// ADMIN: Get ALL Order
router.get("/", verifyTokenAndAdmin, getAllOrder);

// ADMIN: Get monthly Income
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
