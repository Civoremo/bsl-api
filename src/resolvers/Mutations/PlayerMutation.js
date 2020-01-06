const { getUserId } = require("../../utils");

const postPlayer = async (parent, args, context, info) => {
	const userId = getUserId(context);

	const teamFragment = `
    fragment teamPostedByUser on Team {
      postedBy {
        id
        name
      }
    }
  `;
	const posterInfo = await context.prisma.team({ id: args.teamId }).$fragment(teamFragment);

	if (posterInfo.postedBy.id != userId) {
		throw new Error("Not your team to add player to!");
	}

	return await context.prisma.createPlayer({
		name: args.name,
		team: { connect: { id: args.teamId } },
		postedBy: { connect: { id: userId } },
	});
};

module.exports = {
	postPlayer,
};
