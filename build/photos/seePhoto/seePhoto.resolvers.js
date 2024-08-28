"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _client = _interopRequireDefault(require("../../client"));
var resolvers = {
  Query: {
    seePhoto: function seePhoto(_, _ref) {
      var id = _ref.id;
      return _client["default"].photo.findUnique({
        where: {
          id: id
        }
      });
    }
  }
};
var _default = exports["default"] = resolvers;