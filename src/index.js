require("dotenv").config();
const port = process.env.PORT || 4000;
const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Relation = require("./resolvers/Relation");

const resolvers = {
	Query,
	Mutation,
	...Relation,
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
