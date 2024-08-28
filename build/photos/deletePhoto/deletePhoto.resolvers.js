"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = _interopRequireDefault(require("../../client"));
var _users = require("../../users/users.utils");
var resolvers = {
  Mutation: {
    deletePhoto: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(root, _ref, _ref2) {
        var id, loggedInUser, photo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;
              loggedInUser = _ref2.loggedInUser;
              console.log(root);
              _context.next = 5;
              return _client["default"].photo.findUnique({
                where: {
                  id: id
                },
                select: {
                  userId: true
                }
              });
            case 5:
              photo = _context.sent;
              if (photo) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "Photo not found :("
              });
            case 10:
              if (!(photo.userId !== loggedInUser.id)) {
                _context.next = 14;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "Not authorized"
              });
            case 14:
              _context.next = 16;
              return _client["default"].photo["delete"]({
                where: {
                  id: id
                }
              });
            case 16:
              return _context.abrupt("return", {
                ok: true
              });
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
var _default = exports["default"] = resolvers;