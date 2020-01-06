const GameMutation = require("./Mutations/GameMutation");
const LeagueMutation = require("./Mutations/LeagueMutation");
const PlayerMutation = require("./Mutations/PlayerMutation");
const ScroeMutation = require("./Mutations/ScoreMutation");
const TeamMutation = require("./Mutations/TeamMutation");
const UserMutation = require("./Mutations/UserMutation");

module.exports = {
	...GameMutation,
	...LeagueMutation,
	...PlayerMutation,
	...ScroeMutation,
	...TeamMutation,
	...UserMutation,
};
