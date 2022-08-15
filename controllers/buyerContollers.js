const asyncHandler = require("express-async-handler");

const getSellerList = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Seller list" });
});

const getCatalog = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Get Catalog", id:req.params.seller_id });
});

const createOrder = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Order Created",id:req.params.seller_id  });
});

module.exports = {
	getSellerList,
	getCatalog,
	createOrder
}