const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
	{
		seller_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		price: {
			type: Number,
			required: [true, "Please add a price"],
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Item", itemSchema);
