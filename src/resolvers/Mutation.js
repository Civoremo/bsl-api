const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../utils");

const tokenExpiresIn = "3h";

const signup = async (parent, args, context, info) => {
	if (!/^(?=.*\d).{8,}$/.test(args.password)) {
		throw new Error("Password must be 8 char with at least 1 number!");
	}
	const password = await bcrypt.hash(args.password, 14);
	const user = await context.prisma.createUser({ ...args, password });
	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
		expiresIn: tokenExpiresIn,
	});

	return {
		token,
		user,
	};
};

const login = async (parent, args, context, info) => {
	const user = await context.prisma.user({ email: args.email });
	if (!user) {
		throw new Error("No such user found");
	}

	const valid = await bcrypt.compare(args.password, user.password);
	if (!valid) {
		throw new Error("Invalid password");
	}

	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
		expiresIn: tokenExpiresIn,
	});

	return {
		token,
		user,
	};
};

const postLeague = async (parent, args, context, info) => {
	const userId = getUserId(context);
	return await context.prisma.createLeague({
		...args,
		postedBy: { connect: { id: userId } },
	});
};

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
	signup,
	login,
	postLeague,
	postTeam,
	postPlayer,
};
