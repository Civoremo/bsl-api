const team = (parent, args, context) => {
	return context.prisma.loss({ id: parent.id }).team();
};

module.exports = {
	team,
};
