const leagues = (parent, args, context) => {
	return context.prisma.user({ id: parent.id }).leagues();
};

const teams = (parent, args, context) => {
	return context.prisma.user({ id: parent.id }).teams();
};

const games = (parent, args, context) => {
	return context.prisma.user({ id: parent.id }).games();
};

const players = (parent, args, context) => {
	return context.prisma.user({ id: parent.id }).players();
};

module.exports = {
	leagues,
	teams,
	games,
	players,
};
