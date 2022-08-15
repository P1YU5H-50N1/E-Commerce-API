const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const User = require("../model/userModel");
const Item = require("../model/itemModel");
const Order = require("../model/orderModel");
const OrderItem = require("../model/orderItemModel");

//@desc list all sellers
//@route POST /api/auth/login
//@access private
const getSellerList = asyncHandler(async (req, res) => {
	const sellers = await User.find({ user_type: "SELLER" });
	const user_sellers = sellers.map((val) => {
		return {
			_id: val._id,
			name: val.name,
			email: val.email,
		};
	});
	res.status(200).json({ sellers: user_sellers });
});

//@desc get catalog items for a seller
//@route POST /api/auth/login
//@access private
const getCatalog = asyncHandler(async (req, res) => {
	const seller_id = req.params.seller_id;
	const seller = await User.findOne({ _id: seller_id });
	const items = await Item.find({ seller_id: seller });
	res.status(200).json({
		message: "Get Catalog",
		id: req.params.seller_id,
		item_list: items,
	});
});

//@desc create order
//@route POST /api/auth/login
//@access private
const createOrder = asyncHandler(async (req, res) => {
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	const order_items = req.body.items;
	const items = order_items.map(async (item) => {
		let current_item = await Item.findOne({
			name: item.name,
			seller_id: mongoose.Types.ObjectId(item.seller_id),
		});
		current_item["quantity"] = item["quantity"];
		return current_item;
	});
	const all_items = items.reduce((all_good, item) => {
		if (item) {
			all_good = all_good && all_good;
		} else {
			all_good = false;
		}
	}, true);
	if (!all_items) {
		res.status(400);
		throw new Error("Invalid Items");
	}
	const new_order = await Order.create({
		buyer_id: req.user.id,
		seller_id: mongoose.Types.ObjectId(req.body.seller_id),
	});

	const new_order_items = order_items.map(async (order_item) => {
		let add_item = await OrderItem.create({
			seller_id: order_item.seller_id,
			order_id: new_order._id,
			quantity: order_item.quantity,
		});
		return add_item;
	});

	res.status(200).json({
		message: "Order Created Successfully",
		id: req.params.seller_id,
		items: new_order_items,
	});
});

module.exports = {
	getSellerList,
	getCatalog,
	createOrder,
};
