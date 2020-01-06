const { getUserId } = require("../../utils");

const info = (parent, args, context, info) => {
	return "This is the API for Backyard Sports League";
};

const me = (parent, args, context, info) => {
	const userId = getUserId(context);
	return context.prisma.user({ id: userId });
};

const allUsers = (parent, args, context, info) => {
	return context.prisma.users();
};

module.exports = {
	info,
	me,
	allUsers,
};
