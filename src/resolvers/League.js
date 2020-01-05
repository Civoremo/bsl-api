const postedBy = (parent, args, context) => {
	return context.prisma.league({ id: parent.id }).postedBy();
};

const teams = (parent, args, context) => {
	return context.prisma.league({ id: parent.id }).teams();
};

const games = (parent, args, context) => {
	return context.prisma.league({ id: parent.id }).games();
};

module.exports = {
	postedBy,
	teams,
	games,
};
