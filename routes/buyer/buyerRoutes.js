const express = require("express");
const router = express.Router();
const {
	getSellerList,
	getCatalog,
	createOrder,
} = require("../../controllers/buyerContollers");

router.get("/list-of-sellers", getSellerList);

router.get("/seller-catalog/:seller_id", getCatalog);

router.post("/create-order/:seller_id", createOrder);

module.exports = router;
