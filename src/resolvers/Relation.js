const Game = require("./Relations/GameRelation");
const League = require("./Relations/LeagueRelation");
const Loss = require("./Relations/LossRelation");
const Player = require("./Relations/PlayerRelation");
const Team = require("./Relations/TeamRelation");
const Tie = require("./Relations/TieRelation");
const User = require("./Relations/UserRelation");
const Win = require("./Relations/WinRelation");

const Tournament = require("./Relations/TournamentRelation");
const TournamentGame = require("./Relations/GameTournamentRelation");
const TournamentLoss = require("./Relations/LossTournamentRelation");
const TournamentPlayer = require("./Relations/PlayerTournamentRelation");
const TournamentTeam = require("./Relations/TeamTournamentRelation");
const TournamentTie = require("./Relations/TieTournamentRelation");
const TournamentWin = require("./Relations/WinTournamentRelation");

module.exports = {
	Game,
	League,
	Loss,
	Player,
	Team,
	Tie,
	User,
	Win,
	Tournament,
	TournamentGame,
	TournamentLoss,
	TournamentPlayer,
	TournamentTeam,
	TournamentTie,
	TournamentWin,
};
