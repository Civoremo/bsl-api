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

const league = (parent, args, context, info) => {
	return context.prisma.league({ id: args.id });
};

const team = (parent, args, context, info) => {
	return context.prisma.team({ id: args.id });
};

const game = (parent, args, context, info) => {
	return context.prisma.game({ id: args.id });
};

const player = (parent, args, context, info) => {
	return context.prisma.player({ id: args.id });
};

const win = (parent, args, context, info) => {
	return context.prisma.wins({ where: { game: { id: args.id } } });
};

const loss = (parent, args, context, info) => {
	return context.prisma.losses({ where: { game: { id: args.id } } });
};

const tie = (parent, args, context, info) => {
	return context.prisma.ties({ where: { game: { id: args.id } } });
};

module.exports = {
	allLeagues,
	allTeams,
	allGames,
	allPlayers,
	league,
	team,
	game,
	player,
	win,
	loss,
	tie,
};
