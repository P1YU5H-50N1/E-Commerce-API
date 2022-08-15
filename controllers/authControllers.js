const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

//@desc Register User
//@route POST /api/auth/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, user_type } = req.body;
	if (!name || !email || !password) {
		res.status(404);
		throw new Error("Please Add all fields");
	}
	new_user = { name, email };
	if (user_type === "BUYER" || user_type === "SELLER") {
		new_user["user_type"] = user_type;
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User Already Exists");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	new_user["password"] = hashedPassword;

	const user = await User.create(new_user);
	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid User Data");
	}
});

//@desc Register User
//@route POST /api/auth/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = {
	registerUser,
	loginUser,
};
