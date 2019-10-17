"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hashPassword = function hashPassword(password) {
  if (password.length < 8) throw new Error("Password must be 8 characters or longer");
  return _bcryptjs["default"].hash(password, 10);
};

var _default = hashPassword;
exports["default"] = _default;