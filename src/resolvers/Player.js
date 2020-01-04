const postedBy = (parent, args, context) => {
	return context.prisma.player({ id: parent.id }).postedBy();
};

module.exports = {
	postedBy,
};
