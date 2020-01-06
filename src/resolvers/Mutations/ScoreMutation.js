const { getUserId } = require("../../utils");

const postWin = async (parent, args, context, info) => {
	const userId = getUserId(context);

	const gameFragment = `
    fragment gameWinPostedBy on Game {
      postedBy {
        id
      }
      homeTeam {
        id
      }
      awayTeam {
        id
      }
      score
    }
  `;

	const winFragment = `
    fragment teamWonInGame on Win {
      game{
        homeTeam{
          id
        }
        awayTeam {
          id
        }
      }
    }
  `;

	const winInfo = await context.prisma
		.wins({ where: { game: { id: args.gameId } } })
		.$fragment(winFragment);

	const posterInfo = await context.prisma.game({ id: args.gameId }).$fragment(gameFragment);

	if (posterInfo.score == " v ") {
		throw new Error("Can not declare winner without first posting the score!");
	}
	if (posterInfo == null) {
		throw new Error("Could not find the game");
	}
	if (posterInfo.postedBy.id != userId) {
		throw new Error("Not your game to score!");
	}
	if (posterInfo.homeTeam.id == args.teamId || posterInfo.awayTeam.id == args.teamId) {
		if (winInfo.length > 0) {
			if (
				winInfo[0].game.homeTeam.id == args.teamId ||
				winInfo[0].game.awayTeam.id == args.teamId
			) {
				throw new Error("Winning team has already been picked for this game!");
			}
		}
		return await context.prisma.createWin({
			postedBy: { connect: { id: userId } },
			team: { connect: { id: args.teamId } },
			game: { connect: { id: args.gameId } },
		});
	} else {
		throw new Error("Team is not associated with game!");
	}
};

const postLoss = async (parent, args, context, info) => {
	const userId = getUserId(context);

	const gameFragment = `
    fragment gameLossPostedBy on Game {
      postedBy {
        id
        name
      }
      homeTeam {
        id
      }
      awayTeam {
        id
      }
      score
    }
  `;

	const lossFragment = `
    fragment teamLossInGame on Loss {
      game{
        homeTeam{
          id
        }
        awayTeam {
          id
        }
      }
    }
  `;

	const lossInfo = await context.prisma
		.losses({ where: { game: { id: args.gameId } } })
		.$fragment(lossFragment);

	const posterInfo = await context.prisma.game({ id: args.gameId }).$fragment(gameFragment);

	if (posterInfo.score == " v ") {
		throw new Error("Can not declare loser without first posting the score!");
	}
	if (posterInfo == null) {
		throw new Error("Could not find the game");
	}
	if (posterInfo.postedBy.id != userId) {
		throw new Error("Not your game to score!");
	}
	if (posterInfo.homeTeam.id == args.teamId || posterInfo.awayTeam.id == args.teamId) {
		if (lossInfo.length > 0) {
			if (
				lossInfo[0].game.homeTeam.id == args.teamId ||
				lossInfo[0].game.awayTeam.id == args.teamId
			) {
				throw new Error("Losing team has already been picked for this game!");
			}
		}
		return await context.prisma.createLoss({
			postedBy: { connect: { id: userId } },
			team: { connect: { id: args.teamId } },
			game: { connect: { id: args.gameId } },
		});
	} else {
		throw new Error("Team is not associated with game!");
	}
};

const postTie = async (parent, args, context, info) => {
	const userId = getUserId(context);

	const gameFragment = `
    fragment gameTiePostedBy on Game {
      postedBy {
        id
        name
      }
      homeTeam {
        id
      }
      awayTeam {
        id
      }
      score
    }
  `;

	const tieFragment = `
    fragment teamTieInGame on Tie {
      game{
        homeTeam{
          id
        }
        awayTeam{
          id
        }
      }
    }
  `;

	const tieInfo = await context.prisma
		.ties({ where: { game: { id: args.gameId } } })
		.$fragment(tieFragment);
	const posterInfo = await context.prisma.game({ id: args.gameId }).$fragment(gameFragment);

	if (posterInfo.score == " v ") {
		throw new Error("Can not declare a tie without posting the score!");
	}
	if (posterInfo == null) {
		throw new Error("Could not find the game");
	}
	if (posterInfo.postedBy.id != userId) {
		throw new Error("Not your game to score!");
	}
	if (
		(posterInfo.homeTeam.id == args.homeTeamId || posterInfo.awayTeam.id == args.homeTeamId) &&
		(posterInfo.homeTeam.id == args.awayTeamId || posterInfo.awayTeam.id == args.awayTeamId)
	) {
		if (tieInfo.length > 0) {
			if (
				(tieInfo[0].game.homeTeam.id == args.homeTeamId ||
					tieInfo[0].game.awayTeam.id == args.homeTeamId) &&
				(tieInfo[0].game.awayTeam.id == args.awayTeamId ||
					tieInfo[0].game.homeTeam.id == args.awayTeamId)
			) {
				throw new Error("Teams tie has already been recorded!");
			}
		}

		const homeTeam = await context.prisma.createTie({
			postedBy: { connect: { id: userId } },
			team: { connect: { id: args.homeTeamId } },
			game: { connect: { id: args.gameId } },
		});
		const awayTeam = await context.prisma.createTie({
			postedBy: { connect: { id: userId } },
			team: { connect: { id: args.awayTeamId } },
			game: { connect: { id: args.gameId } },
		});
		return await context.prisma.ties({ where: { game: { id: args.gameId } } });
	} else {
		throw new Error("Teams are not associated with game!");
	}
};

module.exports = {
	postWin,
	postLoss,
	postTie,
};
