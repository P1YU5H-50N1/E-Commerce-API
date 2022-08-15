const asyncHandler = require('express-async-handler')


const sellerOrders = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "seller Orders" });
})

const createCatalog = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Created catalog" });
})

module.exports = {
	sellerOrders,
	createCatalog,
};
