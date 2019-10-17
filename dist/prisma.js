"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaBinding = require("prisma-binding");

var _index = require("./resolvers/index");

var prisma = new _prismaBinding.Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'MVGqFS6fa8esqDgC',
  fragmentReplacements: _index.fragmentReplacements
});
var _default = prisma;
exports["default"] = _default;