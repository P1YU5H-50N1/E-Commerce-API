const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "User Registered" });
});

const loginUser = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "User Logged in" });
});

module.exports = {
	registerUser,
	loginUser,
};
