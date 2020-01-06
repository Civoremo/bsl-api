const postedBy = (parent, args, context) => {
	return context.prisma.tournamentLoss({ id: parent.id }).postedBy();
};

const team = (parent, args, context) => {
	return context.prisma.tournamentLoss({ id: parent.id }).team();
};

const game = (parent, args, context) => {
	return context.prisma.tournamentLoss({ id: parent.id }).game();
};

module.exports = {
	postedBy,
	team,
	game,
};
