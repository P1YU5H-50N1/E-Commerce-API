const express = require("express");
const router = express.Router();
const {
	sellerOrders,
	createCatalog,
} = require("../../controllers/sellerControllers");

router.get("/orders", sellerOrders);

router.post("/create-catalog", createCatalog);

module.exports = router;
