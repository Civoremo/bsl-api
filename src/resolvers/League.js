const postedBy = (parent, args, context) => {
	return context.prisma.league({ id: parent.id }).postedBy();
};

const teams = (parent, args, context) => {
	return context.prisma.league({ id: parent.id }).teams();
};

module.exports = {
	postedBy,
	teams,
};
