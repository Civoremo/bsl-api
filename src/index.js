require("dotenv").config();
const port = process.env.PORT || 4000;
const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const League = require("./resolvers/League");
const Team = require("./resolvers/Team");
const Player = require("./resolvers/Player");
const Game = require("./resolvers/Game");
const Win = require("./resolvers/Win");
const Loss = require("./resolvers/Loss");

const resolvers = {
	// Query: {
	// 	info: () => "This is the API of BSL",
	// 	allUsers: (root, args, context, info) => {
	// 		return context.prisma.users();
	// 	},
	// },
	// Mutation: {
	// 	// post: (root, args, context) => {
	// 	// 	return context.prisma.createLink({
	// 	// 		url: args.url,
	// 	// 		description: args.description,
	// 	// 	});
	// 	// },
	// 	post: () => "We made a post",
	// },
	Query,
	Mutation,
	User,
	League,
	Team,
	Player,
	Game,
	Win,
	Loss,
};

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
	context: request => ({
		...request,
		prisma,
	}),
});
server.start(port, () => console.log(`Server is running on port ${port}`));
