"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _client = _interopRequireDefault(require("../../client"));
var resolvers = {
  Query: {
    seeHashtag: function seeHashtag(_, _ref) {
      var hashtag = _ref.hashtag;
      return _client["default"].hashtag.findUnique({
        where: {
          hashtag: hashtag
        }
      });
    }
  }
};
var _default = exports["default"] = resolvers;