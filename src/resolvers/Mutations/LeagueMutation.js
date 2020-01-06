const { getUserId } = require("../../utils");

const postLeague = async (parent, args, context, info) => {
	const userId = getUserId(context);
	return await context.prisma.createLeague({
		...args,
		postedBy: { connect: { id: userId } },
	});
};

module.exports = {
	postLeague,
};
