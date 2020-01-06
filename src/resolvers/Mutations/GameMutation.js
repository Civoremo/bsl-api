const { getUserId } = require("../../utils");

const postGame = async (parent, args, context, info) => {
	const userId = getUserId(context);

	const homeTeamFragment = `
    fragment teamPostedByUser on Team {
      postedBy {
        id
        name
      }
    }
  `;

	const awayTeamFragment = `
  fragment teamPostedByUser on Team {
    postedBy {
      id
      name
    }
  }
  `;

	const leagueFragment = `
  fragment leaguePostedByUser on League {
    postedBy {
      id
      name
    }
  }
  `;

	const homeTeamInfo = await context.prisma.team({ id: args.homeTeam }).$fragment(homeTeamFragment);
	const awayTeamInfo = await context.prisma.team({ id: args.awayTeam }).$fragment(awayTeamFragment);
	const leagueInfo = await context.prisma.league({ id: args.leagueId }).$fragment(leagueFragment);

	if (
		homeTeamInfo.postedBy.id != userId ||
		awayTeamInfo.postedBy.id != userId ||
		leagueInfo.postedBy.id != userId
	) {
		throw new Error("Team/s and/or League are not yours to make this change!");
	}
	return await context.prisma.createGame({
		homeTeam: { connect: { id: args.homeTeam } },
		awayTeam: { connect: { id: args.awayTeam } },
		postedBy: { connect: { id: userId } },
		league: { connect: { id: args.leagueId } },
		time: args.time,
		day: args.day,
		score: args.score,
		videoURL: args.videoURL,
	});
};

module.exports = {
	postGame,
};
