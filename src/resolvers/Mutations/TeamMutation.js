const { getUserId } = require("../../utils");

const teamFragment = `
	fragment teamPostedBy on Team {
		postedBy {
			id
		}
	}
`;

const postTeam = async (parent, args, context, info) => {
	const userId = getUserId(context);

	const leagueFragment = `
    fragment leaguePostedByUser on League {
      postedBy {
        id
        name
      }
    }
  `;
	const posterInfo = await context.prisma.league({ id: args.leagueId }).$fragment(leagueFragment);

	if (posterInfo.postedBy.id != userId) {
		throw new Error("Not your league to add team to!");
	}
	return await context.prisma.createTeam({
		name: args.name,
		league: { connect: { id: args.leagueId } },
		postedBy: { connect: { id: userId } },
	});
};

const updateTeam = async (parent, args, context, info) => {
	const userId = await getUserId(context);

	const teamInfo = await context.prisma.team({ id: args.teamId }).$fragment(teamFragment);

	if (!userId) {
		throw new Error("You must be logged in to make changes to a team");
	}

	if (!teamInfo) {
		throw new Error("Could not find team with the provided ID");
	}

	if (teamInfo.postedBy.id !== userId) {
		throw new Error("You must be the owner to update a team");
	}

	const updatedTeam = await context.prisma.updateTeam({
		where: { id: teamId },
		data: {
			name: args.name,
			league: args.leagueId,
		},
	});

	return updatedTeam;
};

const deleteTeam = async (parent, args, context, info) => {
	const userId = await getUserId(context);

	const teamInfo = await context.prisma.team({ id: args.teamId }).$fragment(teamFragment);

	if (!userId) {
		throw new Error("You must be logged in to delete a team");
	}

	if (!teamInfo) {
		throw new Error("Could not find team with the provided ID");
	}

	if (teamInfo.postedBy.id !== userId) {
		throw new Error("You must be the owner to delete a team");
	}

	const deletedTeam = await context.prisma.deleteTeam({
		id: args.teamId,
	});

	return { message: "Team has be deleted" };
};

module.exports = {
	postTeam,
	updateTeam,
	deleteTeam,
};
