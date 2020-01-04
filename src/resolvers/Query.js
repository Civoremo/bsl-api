const info = (parent, args, context, info) => {
	return "This is the API for Backyard Sports League";
};

const allUsers = (parent, args, context, info) => {
	return context.prisma.users();
};

const allLeagues = (parent, args, context, info) => {
	return context.prisma.leagues();
};

module.exports = {
	info,
	allUsers,
	allLeagues,
};
