const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const{items,totalAmount} = req.body; 
    const userId = req.user.id;
const order = await Order.create({user:userId,items,totalAmount})
res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order
      .find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      // Stage 1: only this user's orders
      { $match: { user: new mongoose.Types.ObjectId(req.user.id)} },

      // Stage 2: calculate totals
      {
        $group: {
          _id: null,              // group ALL orders together
          totalOrders: { $sum: 1 },           // count orders
          totalSpent: { $sum: "$totalAmount" }, // sum all amounts
          avgOrderValue: { $avg: "$totalAmount" } // average
        }
      }
    ]);

    res.status(200).json(stats[0] || {
      totalOrders: 0,
      totalSpent: 0,
      avgOrderValue: 0
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createOrder, getMyOrders ,getOrderStats};