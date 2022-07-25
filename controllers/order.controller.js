const Order = require("../models/order.model");
const User = require("../models/user.model");

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saveOrder = await Order.create(newOrder);
    res.status(200).json({ message: saveOrder });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Order  deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const isUserExist = await User.findById(req.params.userId);
    console.log(isUserExist);
    if (!isUserExist) {
      throw new Error("User does not exist");
    } else {
      const order = await Order.find({ userId: req.params.userId });
      res.status(200).json({ message: order });
    }
  } catch (Error) {
    res.status(500).json({ error: Error.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ message: orders });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  console.log(date, lastMonth, previousMonth);
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", TotalSale: { $sum: "$sales" } } },
    ]);
    res.status(200).json({ message: income });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrder,
  getMonthlyIncome,
};
