const { getUserId } = require("../../utils");

const postLeague = async (parent, args, context, info) => {
	const userId = getUserId(context);
	return await context.prisma.createLeague({
		...args,
		postedBy: { connect: { id: userId } },
	});
};

const updateLeague = async (parent, args, context, info) => {
	const userId = getUserId(context);

	if (!userId) {
		throw new Error("You must be logged in to update a League");
	}

	const updatedLeague = await context.prisma.updateLeague({
		where: {
			id: args.leagueId,
			postedBy: userId,
		},
		data: {
			name: args.leagueName,
			location: args.leagueLocation,
		},
	});

	return updatedLeague;
};

module.exports = {
	postLeague,
	updateLeague,
};
