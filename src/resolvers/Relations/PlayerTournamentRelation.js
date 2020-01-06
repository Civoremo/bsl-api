const postedBy = (parent, args, context) => {
	return context.prisma.tournamentPlayer({ id: parent.id }).postedBy();
};

const team = (parent, args, context) => {
	return context.prisma.tournamentPlayer({ id: parent.id }).team();
};

module.exports = {
	postedBy,
	team,
};
