const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require("../controllers/product.controller");
const { verifyTokenAndAdmin } = require("../middlewares/auth.middleware");

// CREATE Product
router.post("/", verifyTokenAndAdmin, createProduct);

// GET Product
router.get("/:id", verifyTokenAndAdmin, getProduct);

// GET all products
router.get("/", verifyTokenAndAdmin, getProducts);

// UPDATE Product
router.put("/:id", verifyTokenAndAdmin, updateProduct);

// DELETE Product
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

module.exports = router;
