const mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema(
	{
		seller_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		order_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Order",
		},
		quantity: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("OrderItem", OrderItemSchema);
