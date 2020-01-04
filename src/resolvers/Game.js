const postedBy = (parent, args, context) => {
	return context.prisma.game({ id: parent.id }).postedBy();
};

module.exports = {
	postedBy,
};
