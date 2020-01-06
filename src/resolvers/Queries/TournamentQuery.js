const allTournaments = (parent, args, context, info) => {
	return context.prisma.tournaments();
};

const allTeamsTournament = (parent, args, context, info) => {
	return context.prisma.tournamentTeams();
};

const allPlayerTournament = (parent, args, context, info) => {
	return context.prisma.tournamentPlayers();
};

const tournament = (parent, args, context, info) => {
	return context.prisma.tournament({ id: args.id });
};

const teamTournament = (parent, args, context, info) => {
	return context.prisma.tournamentTeam({ id: args.id });
};

const gameTournament = (parent, args, context, info) => {
	return context.prisma.tournamentGame({ id: args.id });
};

const playerTournament = (parent, args, context, info) => {
	return context.prisma.tournamentPlayer({ id: args.id });
};

const winTournament = (parent, args, context, info) => {
	return context.prisma.tournamentWins({ where: { game: { id: args.id } } });
};

const lossTournament = (parent, args, context, info) => {
	return context.prisma.tournamentLosses({ where: { game: { id: args.id } } });
};

const tieTournament = (parent, args, context, info) => {
	return context.prisma.tournamentTies({ where: { game: { id: args.id } } });
};

module.exports = {
	allTournaments,
	allTeamsTournament,
	allPlayerTournament,
	tournament,
	teamTournament,
	gameTournament,
	playerTournament,
	winTournament,
	lossTournament,
	tieTournament,
};
