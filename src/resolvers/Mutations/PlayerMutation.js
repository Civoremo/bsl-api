const { getUserId } = require("../../utils");

const teamFragment = `
	fragment teamPostedByUser on Team {
		postedBy {
			id
			name
		}
	}
`;

const playerFragment = `
	fragment playerPostedBy on Player {
		name
		played
		goals
		assists
		saves
		team
		postedBy {
			id
		}
	}
`;

const postPlayer = async (parent, args, context, info) => {
	const userId = await getUserId(context);

	const posterInfo = await context.prisma.team({ id: args.teamId }).$fragment(teamFragment);

	if (!userId) {
		throw new Error("You must be logged in to make changes");
	}

	if (!posterInfo) {
		throw new Error("You must be the team owner to add players");
	}

	if (posterInfo.postedBy.id != userId) {
		throw new Error("Not your team to add player to!");
	}

	return await context.prisma.createPlayer({
		name: args.name,
		team: { connect: { id: args.teamId } },
		postedBy: { connect: { id: userId } },
	});
};

const updatePlayer = async (parent, args, context, info) => {
	const userId = await getUserId(context);

	const playerInfo = await context.prisma.player({ id: args.playerId }).$fragment(playerFragment);

	if (!userId) {
		throw new Error("You must be logged in to make changes");
	}

	if (!playerInfo) {
		throw new Error("Player could not be found with the provided ID");
	}

	if (playerInfo.postedBy.id !== userId) {
		throw new Error("You must be the owner to update player info");
	}

	const updatedPlayer = await context.prisma.updatePlayer({
		where: { id: args.playerId },
		data: {
			name: args.name,
			played: playerInfo.played + args.played,
			goals: playerInfo.goals + args.goals,
			assists: playerInfo.assists + args.assists,
			saves: playerInfo.saves + args.saves,
			team: args.teamId,
		},
	});

	return updatedPlayer;
};

module.exports = {
	postPlayer,
	updatePlayer,
};
