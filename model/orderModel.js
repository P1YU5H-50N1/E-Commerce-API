const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		buyer_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Order", orderSchema);
