const express = require("express");
const router = express.Router();
const {
	sellerOrders,
	createCatalog,
} = require("../../controllers/sellerControllers");
const { protect } = require('../../middleware/authMiddleware')


router.get("/orders",protect, sellerOrders);

router.post("/create-catalog",protect, createCatalog);

module.exports = router;
