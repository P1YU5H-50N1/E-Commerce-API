const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		buyer_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Order", orderSchema);
