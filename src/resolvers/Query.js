const UserQueries = require("./Queries/UserQuery");
const LeagueQueries = require("./Queries/LeagueQuery");
const TournamentQueries = require("./Queries/TournamentQuery");

module.exports = {
	...UserQueries,
	...LeagueQueries,
	...TournamentQueries,
};
