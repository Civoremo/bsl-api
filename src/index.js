const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
	Query: {
		info: () => "This is the API of BSL",
		feed: (root, args, context, info) => {
			return context.prisma.links();
		},
	},
	Mutation: {
		post: (root, args, context) => {
			return context.prisma.createLink({
				url: args.url,
				description: args.description,
			});
		},
	},
};

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
	// context: request => ({
	// 	...request,
	// 	db: new Prisma({
	// 		endpoint: "https://bsl-api-4bac55b41d.herokuapp.com/backyard-sports-league/dev",
	// 	}),
	// }),
	context: { prisma },
});
server.start(() => console.log("Server is running on port 4000"));