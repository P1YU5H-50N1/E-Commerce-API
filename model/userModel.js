const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please add a name"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add a name"],
		},
        user_type: {
            type: String,
            enum: ['BUYER','SELLER'],
            default: 'BUYER'
        }
	},
	{
		timestamps: true,
	}
);


module.exports = mongoose.model('User',userSchema)