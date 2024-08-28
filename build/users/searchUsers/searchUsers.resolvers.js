"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = _interopRequireDefault(require("../../client"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var resolvers = {
  Query: {
    searchUsers: function () {
      var _searchUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var keyword, lastId, page_size, searchUsers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              keyword = _ref.keyword, lastId = _ref.lastId;
              page_size = 5;
              _context.next = 4;
              return _client["default"].user.findMany(_objectSpread({
                where: {
                  username: {
                    startsWith: keyword.toLowerCase()
                  }
                },
                take: page_size,
                skip: lastId ? 1 : 0
              }, lastId && {
                cursor: {
                  id: lastId
                }
              }));
            case 4:
              searchUsers = _context.sent;
              console.log(searchUsers);
              return _context.abrupt("return", searchUsers);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function searchUsers(_x, _x2) {
        return _searchUsers.apply(this, arguments);
      }
      return searchUsers;
    }()
  }
};
var _default = exports["default"] = resolvers;