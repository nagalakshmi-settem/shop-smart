const Review = require("../models/Review");

const getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review
      .find({ product: productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.create({
      product: productId,
      user: userId,
      rating,
      comment
    });

    await review.populate('user', 'name');
    res.status(201).json(review);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "You already reviewed this product" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getReviews, addReview };