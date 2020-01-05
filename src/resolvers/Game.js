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

module.exports = {
	postedBy,
	league,
	homeTeam,
	awayTeam,
};
