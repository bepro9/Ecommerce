const Cart = require("../models/cart.model");
const User = require("../models/user.model");

const createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const saveCart = await Cart.create(newCart);
    res.status(200).json({ message: saveCart });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: updatedCart });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Cart deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getCart = async (req, res) => {
  try {
    const isUserExist = await User.findById(req.params.userId);
    if (!isUserExist) {
      throw new Error("User does not exist");
    } else {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json({ message: cart });
    }
  } catch (Error) {
    res.status(500).json({ error: Error.message });
  }
};

const getAllCart = async (req, res) => {
  try {
    const cart = await Cart.find({});
    res.status(200).json({ message: cart });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
module.exports = { createCart, updateCart, deleteCart, getCart, getAllCart };
