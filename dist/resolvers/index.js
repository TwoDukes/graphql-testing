"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragmentReplacements = exports.resolvers = void 0;

var _prismaBinding = require("prisma-binding");

var _Query = _interopRequireDefault(require("./Query"));

var _Mutation = _interopRequireDefault(require("./Mutation"));

var _User = _interopRequireDefault(require("./User"));

var _Post = _interopRequireDefault(require("./Post"));

var _Comment = _interopRequireDefault(require("./Comment"));

var _Subscription = _interopRequireDefault(require("./Subscription"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolvers = {
  Query: _Query["default"],
  Mutation: _Mutation["default"],
  User: _User["default"],
  Post: _Post["default"],
  Comment: _Comment["default"],
  Subscription: _Subscription["default"]
};
exports.resolvers = resolvers;
var fragmentReplacements = (0, _prismaBinding.extractFragmentReplacements)(resolvers);
exports.fragmentReplacements = fragmentReplacements;