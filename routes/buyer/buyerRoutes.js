const express = require("express");
const router = express.Router();
const {
	getSellerList,
	getCatalog,
	createOrder,
} = require("../../controllers/buyerContollers");

router.get("/list-of-sellers", getSellerList);

router.get("/seller-catalog/:seller-id", getCatalog);

router.post("/create-order/:seller-id", createOrder);

module.exports = router;
