const express = require("express");
const { createOrder,getMyOrders, getOrderStats } = require("../controllers/orderController");
const protect = require("../middleware/auth");
const router = express.Router();

router.post("/",protect,createOrder)
router.get("/my",protect,getMyOrders)
router.get("/stats",protect,getOrderStats)

module.exports = router;