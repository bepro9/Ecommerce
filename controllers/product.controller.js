const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saveProduct = await Product.create(newProduct);
    res.status(200).json({ message: saveProduct });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getProduct = async (req, res) => {
  try {
    const isProductExist = await Product.findById(req.params.id);
    if (!isProductExist) {
      throw new Error("Product not found");
    } else {
      const product = await Product.findOne(req.body.id);
      res.status(200).json({ message: product });
    }
  } catch (Error) {
    res.status(500).json({ error: Error.message });
  }
};

const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find({});
    }
    res.status(200).json({ message: products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
