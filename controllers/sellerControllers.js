const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const OrderItem = require("../model/orderItemModel");
const Item = require("../model/itemModel");
const { default: mongoose } = require("mongoose");

const sellerOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ _id: req.user.id });
	const orders_success = orders.map(async (order, idx) => {
		let items = await OrderItem.find({ order_id: order._id });
		order.items = items;
		return order;
	});
	res.status(200).json({ message: "seller Orders", orders: orders });
});

const createCatalog = asyncHandler(async (req, res) => {
	const items = req.body.items.map((item) => {
		item.seller_id = mongoose.Types.ObjectId(req.user.id);
		return item;
	});
	const items_success = await Item.insertMany(items);
	res.status(200).json({ message: "Created catalog", items: items_success });
});

module.exports = {
	sellerOrders,
	createCatalog,
};
