const express = require("express");
const router = express.Router();
const { getReviews, addReview } = require("../controllers/reviewController");
const protect = require("../middleware/auth");

router.get("/:productId", getReviews);           // public
router.post("/:productId", protect, addReview);  // protected

module.exports = router;