const postedBy = (parent, args, context) => {
	return context.prisma.tournamentGame({ id: parent.id }).postedBy();
};

const tournament = (parent, args, context) => {
	return context.prisma.tournamentGame({ id: parent.id }).tournament();
};

const homeTeam = (parent, args, context) => {
	return context.prisma.tournamentGame({ id: parent.id }).homeTeam();
};

const awayTeam = (parent, args, context) => {
	return context.prisma.tournamentGame({ id: parent.id }).awayTeam();
};

const wins = (parent, args, context) => {
	return context.prisma.tournamentGame({ id: parent.id }).wins();
};

const losses = (parent, args, context) => {
	return context.prisma.tournamentGame({ id: parent.id }).losses();
};

const ties = (parent, args, context) => {
	return context.prisma.tournamentGame({ id: parent.id }).ties();
};

module.exports = {
	postedBy,
	tournament,
	homeTeam,
	awayTeam,
	wins,
	losses,
	ties,
};
