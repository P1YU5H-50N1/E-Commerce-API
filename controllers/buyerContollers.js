const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const User = require("../model/userModel");
const Item = require("../model/itemModel");
const Order = require("../model/orderModel");
const OrderItem = require("../model/orderItemModel");

//@desc list all sellers
//@route POST /api/buyer/list-of-sellers
//@access private
const getSellerList = asyncHandler(async (req, res) => {
	if (req.user.user_type !== "BUYER") {
		res.status(401);
		throw new Error("Not authorized");
	}
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
//@route GET /api/buyer/seller-catalog/:seller_id
//@access private
const getCatalog = asyncHandler(async (req, res) => {
	if (req.user.user_type !== "BUYER") {
		res.status(401);
		throw new Error("Not authorized");
	}

	const seller_id = req.params.seller_id;
	if (!mongoose.Types.ObjectId.isValid(seller_id)) {
		res.status(400);
		throw new Error("Invalid seller id");
	}

	const seller = await User.findOne({ _id: seller_id });

	if (!seller) {
		res.status(400);
		throw new Error("Invalid seller id");
	}

	const items = await Item.find({ seller_id: seller });
	res.status(200).json({
		message: "Get Catalog",
		seller_id: req.params.seller_id,
		item_list: items,
	});
});

//@desc create order
//@route POST /api/buyer/create-order/:seller_id
//@access private
const createOrder = asyncHandler(async (req, res) => {
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}
	if (req.user.user_type !== "BUYER") {
		res.status(401);
		throw new Error("Not authorized");
	}
	const seller_id = req.params.seller_id;
	if (!mongoose.Types.ObjectId.isValid(seller_id)) {
		res.status(400);
		throw new Error("Invalid seller id");
	}

	const order_items = req.body.items;
	const items = await Promise.all(
		order_items.map(async (item) => {
			let current_item = await Item.findOne({
				name: item.name,
				seller_id: mongoose.Types.ObjectId(seller_id),
			});
			if (!current_item) {
				res.status(400);
				throw new Error("Invalid Items Or Seller Id");
			}
			current_item["quantity"] = item["quantity"] || 1;
			return current_item;
		})
	);

	const new_order = await Order.create({
		buyer_id: req.user.id,
		seller_id: mongoose.Types.ObjectId(seller_id),
	});

	const new_order_items = items.map((item) => {
		return {
			seller_id: item.seller_id,
			order_id: new_order,
			quantity: item.quantity,
		};
	});
	const inserted_items = await OrderItem.insertMany(new_order_items);

	res.status(200).json({
		message: "Order Created Successfully",
		id: seller_id,
		items: inserted_items,
	});
});

module.exports = {
	getSellerList,
	getCatalog,
	createOrder,
};
