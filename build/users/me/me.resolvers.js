"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _client = _interopRequireDefault(require("../../client"));
var _users = require("../users.utils");
var resolvers = {
  Query: {
    me: (0, _users.protectedResolver)(function (_, __, _ref) {
      var loggedInUser = _ref.loggedInUser;
      return _client["default"].user.findUnique({
        where: {
          id: loggedInUser.id
        }
      });
    })
  }
};
var _default = exports["default"] = resolvers;