const { getUserId } = require("../utils");

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

const allLeagues = (parent, args, context, info) => {
	return context.prisma.leagues();
};

const allTeams = (parent, args, context, info) => {
	return context.prisma.teams();
};

const allGames = (parent, args, context, info) => {
	return context.prisma.games();
};

const allPlayers = (parent, args, context, info) => {
	return context.prisma.players();
};

module.exports = {
	info,
	me,
	allUsers,
	allLeagues,
	allTeams,
	allGames,
	allPlayers,
};
