const Wishlist = require("../models/WishList")

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate("products");
    
    if (!wishlist) {
      return res.status(200).json({ products: [] }); // ← empty array, not error
    }
    
    res.status(200).json({ products: wishlist.products });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $addToSet: { products: productId } },
      { upsert: true, returnDocument: 'after' }
    ).populate("products");

    res.status(200).json({ products: wishlist.products });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: productId } },
      { returnDocument: 'after' }
    ).populate("products");
    res.status(200).json({ products: wishlist.products });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {getWishlist,addToWishlist,removeFromWishlist}

