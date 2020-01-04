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

const players = (parent, args, context) => {
	return context.prisma.team({ id: parent.id }).players();
};

module.exports = {
	postedBy,
	league,
	wins,
	losses,
	players,
};
