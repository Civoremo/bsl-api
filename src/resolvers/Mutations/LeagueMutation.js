const { getUserId } = require("../../utils");

const leagueFragment = `
		fragment leaguePostedBy on League {
			id
			postedBy {
				id
			}
		}
	`;

const postLeague = async (parent, args, context, info) => {
	const userId = await getUserId(context);
	return await context.prisma.createLeague({
		...args,
		postedBy: { connect: { id: userId } },
	});
};

const updateLeague = async (parent, args, context, info) => {
	const userId = await getUserId(context);

	const league = await context.prisma.league({ id: args.leagueId }).$fragment(leagueFragment);
	const user = await context.prisma.user({ id: userId });
	// console.log(league);
	// console.log(user);

	if (!userId) {
		throw new Error("You must be logged in to update a League");
	}

	if (!league) {
		throw new Error("Could not find League with the provided ID");
	}

	if (league.postedBy.id !== userId) {
		throw new Error("You must be the owner to update this league");
	}
	const updatedLeague = await context.prisma.updateLeague({
		where: {
			id: args.leagueId,
		},
		data: {
			name: args.leagueName,
			location: args.leagueLocation,
		},
	});

	return updatedLeague;
};

const deleteLeague = async (parent, args, context, info) => {
	const userId = await getUserId(context);

	const league = await context.prisma.league({ id: args.leagueId }).$fragment(leagueFragment);

	if (!userId) {
		throw new Error("You must be logged in to make changes to league");
	}

	if (league.postedBy.id !== userId) {
		throw new Error("You must be the owner to delete this league");
	}

	if (!league) {
		throw new Error("Could not find League with the provided ID");
	}

	const deletedLeague = await context.prisma.deleteLeague({
		id: args.leagueId,
	});

	return { message: "League has been deleted" };
};

module.exports = {
	postLeague,
	updateLeague,
	deleteLeague,
};
