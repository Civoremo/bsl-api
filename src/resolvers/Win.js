const team = (parent, args, context) => {
	return context.prisma.win({ id: parent.id }).team();
};

module.exports = {
	team,
};
