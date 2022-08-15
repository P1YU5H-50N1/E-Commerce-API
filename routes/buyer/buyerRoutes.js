const express = require("express");
const router = express.Router();
const {
	getSellerList,
	getCatalog,
	createOrder,
} = require("../../controllers/buyerContollers");
const { protect } = require('../middleware/authMiddleware')


router.get("/list-of-sellers",protect, getSellerList);

router.get("/seller-catalog/:seller_id",protect, getCatalog);

router.post("/create-order/:seller_id",protect, createOrder);

module.exports = router;
