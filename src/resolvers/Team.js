const postedBy = (parent, args, context) => {
	return context.prisma.team({ id: parent.id }).postedBy();
};

const league = (parent, args, context) => {
	return context.prisma.team({ id: parent.id }).league();
};

const wins = (parent, args, context) => {
	return context.prisma.team({ id: parent.id }).wins();
};

const losses = (parent, args, context) => {
	return context.prisma.team({ id: parent.id }).losses();
};

const ties = (parent, args, context) => {
	return context.prisma.team({ id: parent.id }).ties();
};

const players = (parent, args, context) => {
	return context.prisma.team({ id: parent.id }).players();
};

const games = (parent, args, context) => {
	return context.prisma.team({ id: parent.id }).games();
};

module.exports = {
	postedBy,
	league,
	wins,
	losses,
	players,
	games,
	ties,
};
