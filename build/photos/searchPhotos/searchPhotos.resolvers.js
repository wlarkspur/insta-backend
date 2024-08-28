"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _client = _interopRequireDefault(require("../../client"));
var resolvers = {
  Query: {
    searchPhotos: function searchPhotos(_, _ref) {
      var keyword = _ref.keyword;
      return _client["default"].photo.findMany({
        where: {
          caption: {
            contains: keyword
          }
        }
      });
    }
  }
};
var _default = exports["default"] = resolvers;