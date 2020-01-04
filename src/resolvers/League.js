const postedBy = (parent, args, context) => {
	return context.prisma.league({ id: parent.id }).postedBy();
};

module.exports = {
	postedBy,
};
