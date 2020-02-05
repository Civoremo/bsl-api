const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { getUserId } = require("../../utils");

const tokenExpiresIn = "3h";

const signup = async (parent, args, context, info) => {
	if (!/^(?=.*\d).{8,}$/.test(args.password)) {
		throw new Error("Password must be 8 char with at least 1 number!");
	}
	const password = await bcrypt.hash(args.password, 14);
	const user = await context.prisma.createUser({ ...args, password });
	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
		expiresIn: tokenExpiresIn,
	});

	return {
		token,
		user,
	};
};

const login = async (parent, args, context, info) => {
	const user = await context.prisma.user({ email: args.email });
	if (!user) {
		throw new Error("No such user found");
	}

	const valid = await bcrypt.compare(args.password, user.password);
	if (!valid) {
		throw new Error("Invalid password");
	}

	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
		expiresIn: tokenExpiresIn,
	});

	return {
		token,
		user,
	};
};

const updateProfile = async (parent, args, context, info) => {
	const userId = getUserId(context);

	if (!userId) {
		throw new Error("You must be logged in to update your profile");
	}

	const updated = await context.prisma.updateUser(
		{
			where: { id: userId },
			data: { ...args },
		},
		info
	);

	return updated;
};

const updateUserPassword = async (parent, args, context, info) => {
	const userId = getUserId(context);

	if (!userId) {
		throw new Error("You must be logged in to update password");
	}
	const user = await context.prisma.user({ id: userId });

	if (args.newPass1 !== args.newPass2) {
		throw new Error("New passwords do not match");
	}

	const checkOldPassword = await bcrypt.compare(args.oldPass, user.password);
	if (!checkOldPassword) {
		throw new Error("Incorrect password provided");
	}

	const updatedPassword = await bcrypt.hash(args.newPass1, 14);

	const updatedUser = await context.prisma.updateUser({
		where: { id: userId },
		data: {
			password: updatedPassword,
		},
	});

	return { message: "Password update successful" };
};

const requestPasswordReset = async (parent, { email }, context, info) => {
	const user = await context.prisma.user({ email: email });

	if (!user) {
		throw new Error(`No user found with that email ${email}`);
	}

	const random = await randomBytes(20);

	const resetToken = random.toString("hex");
	const resetTokenExpiration = Date.now() + 3600000;
	const res = await context.prisma.updateUser({
		where: { email: email },
		data: { resetToken: resetToken, resetTokenExpiration: resetTokenExpiration },
	});

	// console.log(JSON.stringify(res) + "\n\n");
	// console.log(resetToken);
	return { message: "Reset link sent to email" };
};

module.exports = {
	signup,
	login,
	updateProfile,
	updateUserPassword,
	requestPasswordReset,
};
