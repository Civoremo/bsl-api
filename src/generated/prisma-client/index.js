"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "League",
    embedded: false
  },
  {
    name: "Team",
    embedded: false
  },
  {
    name: "Player",
    embedded: false
  },
  {
    name: "Win",
    embedded: false
  },
  {
    name: "Loss",
    embedded: false
  },
  {
    name: "Tie",
    embedded: false
  },
  {
    name: "Game",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://bsl-api-4bac55b41d.herokuapp.com/backyard-sports-league/dev`
});
exports.prisma = new exports.Prisma();
