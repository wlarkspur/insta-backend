"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _client = _interopRequireDefault(require("../../client"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var resolvers = {
  Query: {
    seePhotoComments: function seePhotoComments(_, _ref) {
      var id = _ref.id,
        lastId = _ref.lastId;
      return _client["default"].comment.findMany(_objectSpread(_objectSpread({
        where: {
          photoId: id
        },
        take: 5,
        skip: lastId ? 1 : 0
      }, lastId && {
        cursor: {
          id: lastId
        }
      }), {}, {
        orderBy: {
          createdAt: "desc"
        }
      }));
    }
  }
};
var _default = exports["default"] = resolvers;