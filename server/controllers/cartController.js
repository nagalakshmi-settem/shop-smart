const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product');  // ← correct syntax

    if (!cart) {
      return res.status(200).json({ items: [], total: 0 });
    }

    // price × quantity for each item, then sum all
    const total = cart.items.reduce((acc, item) => {
      return acc + (item.product.price * item.quantity);
    }, 0);

    res.status(200).json({ items: cart.items, total });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Try to increment quantity if product already in cart
    let cart = await Cart.findOneAndUpdate(
      { user: req.user.id, "items.product": productId },
      { $inc: { "items.$.quantity": 1 } },
      {returnDocument: 'after'}
    ).populate('items.product');

    // If product not in cart yet — add it
    if (!cart) {
      cart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        { $push: { items: { product: productId, quantity: 1 } } },
        { upsert: true, returnDocument: 'after' }
      ).populate('items.product');
    }

    const total = cart.items.reduce((acc, item) =>
      acc + (item.product.price * item.quantity), 0);

    res.status(200).json({ items: cart.items, total });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { product: productId } } },
      { returnDocument: 'after' }
    ).populate('items.product');

    const total = cart.items.reduce((acc, item) =>
      acc + (item.product.price * item.quantity), 0);

    res.status(200).json({ items: cart.items, total });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getCart,addToCart,removeFromCart };