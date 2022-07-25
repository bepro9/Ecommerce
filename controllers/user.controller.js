const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: "success",
      message: users,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUser = async (req, res) => {
  // validate the :id
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({
      status: "success",
      message: others,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: updatedUser });
  } catch (error) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    res.status(500).json(err);
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
