const postedBy = (parent, args, context) => {
	return context.prisma.tournamentTeam({ id: parent.id }).postedBy();
};

const tournament = (parent, args, context) => {
	return context.prisma.tournamentTeam({ id: parent.id }).tournament();
};

const players = (parent, args, context) => {
	return context.prisma.tournamentTeam({ id: parent.id }).players();
};

const games = (parent, args, context) => {
	return context.prisma.tournamentTeam({ id: parent.id }).games();
};

const wins = (parent, args, context) => {
	return context.prisma.tournamentTeam({ id: parent.id }).wins();
};

const losses = (parent, args, context) => {
	return context.prisma.tournamentTeam({ id: parent.id }).losses();
};

const ties = (parent, args, context) => {
	return context.prisma.tournamentTeam({ id: parent.id }).ties();
};

module.exports = {
	postedBy,
	tournament,
	players,
	games,
	wins,
	losses,
	ties,
};
