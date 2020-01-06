const UserQueries = require("./Queries/UserQuery");
const LeagueQueries = require("./Queries/LeagueQuery");
const TournamentQueries = require("./Queries/TournamentQuery");

module.exports = {
	...UserQueries,
	...LeagueQueries,
	...TournamentQueries,
};

// const { getUserId } = require("../utils");

// const info = (parent, args, context, info) => {
// 	return "This is the API for Backyard Sports League";
// };

// const me = (parent, args, context, info) => {
// 	const userId = getUserId(context);
// 	return context.prisma.user({ id: userId });
// };

// const allUsers = (parent, args, context, info) => {
// 	return context.prisma.users();
// };

// const allLeagues = (parent, args, context, info) => {
// 	return context.prisma.leagues();
// };

// const allTeams = (parent, args, context, info) => {
// 	return context.prisma.teams();
// };

// const allGames = (parent, args, context, info) => {
// 	return context.prisma.games();
// };

// const allPlayers = (parent, args, context, info) => {
// 	return context.prisma.players();
// };

// const league = (parent, args, context, info) => {
// 	return context.prisma.league({ id: args.id });
// };

// const team = (parent, args, context, info) => {
// 	return context.prisma.team({ id: args.id });
// };

// const game = (parent, args, context, info) => {
// 	return context.prisma.game({ id: args.id });
// };

// const player = (parent, args, context, info) => {
// 	return context.prisma.player({ id: args.id });
// };

// const tie = (parent, args, context, info) => {
// 	return context.prisma.ties({ where: { game: { id: args.id } } });
// };

// module.exports = {
// 	info,
// 	me,
// 	allUsers,
// 	allLeagues,
// 	allTeams,
// 	allGames,
// 	allPlayers,
// 	league,
// 	team,
// 	game,
// 	player,
// 	tie,
// };
