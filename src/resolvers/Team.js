const postedBy = (parent, args, context) => {
	return context.prisma.team({ id: parent.id }).postedBy();
};

module.exports = {
	postedBy,
};
