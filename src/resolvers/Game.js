const postedBy = (parent, args, context) => {
	return context.prisma.game({ id: parent.id }).postedBy();
};

const league = (parent, args, context) => {
	return context.prisma.game({ id: parent.id }).league();
};

const homeTeam = (parent, args, context) => {
	return context.prisma.game({ id: parent.id }).homeTeam();
};

const awayTeam = (parent, args, context) => {
	return context.prisma.game({ id: parent.id }).awayTeam();
};

const wins = (parent, args, context) => {
	return context.prisma.game({ id: parent.id }).wins();
};

const losses = (parent, args, context) => {
	return context.prisma.game({ id: parent.id }).losses();
};

const ties = (parent, args, context) => {
	return context.prisma.game({ id: parent.id }).ties();
};

module.exports = {
	postedBy,
	league,
	homeTeam,
	awayTeam,
	wins,
	losses,
	ties,
};
