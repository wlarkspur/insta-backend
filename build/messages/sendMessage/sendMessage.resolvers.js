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
var _constants = require("../../constants");
var _pusub = _interopRequireDefault(require("../../pusub"));
var _users = require("../../users/users.utils");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var _default = exports["default"] = {
  Mutation: {
    sendMessage: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var payload, roomId, userId, loggedInUser, room, user, message;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              payload = _ref.payload, roomId = _ref.roomId, userId = _ref.userId;
              loggedInUser = _ref2.loggedInUser;
              room = null;
              if (!userId) {
                _context.next = 14;
                break;
              }
              _context.next = 6;
              return _client["default"].user.findUnique({
                where: {
                  id: userId
                },
                select: {
                  id: true
                }
              });
            case 6:
              user = _context.sent;
              if (user) {
                _context.next = 9;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "This user does not exist."
              });
            case 9:
              _context.next = 11;
              return _client["default"].room.create({
                data: {
                  users: {
                    connect: [{
                      id: userId
                    }, {
                      id: loggedInUser.id
                    }]
                  }
                }
              });
            case 11:
              room = _context.sent;
              _context.next = 20;
              break;
            case 14:
              if (!roomId) {
                _context.next = 20;
                break;
              }
              _context.next = 17;
              return _client["default"].room.findUnique({
                where: {
                  id: roomId
                },
                select: {
                  id: true
                }
              });
            case 17:
              room = _context.sent;
              if (room) {
                _context.next = 20;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "Room not found :(."
              });
            case 20:
              _context.next = 22;
              return _client["default"].message.create({
                data: {
                  payload: payload,
                  room: {
                    connect: {
                      id: room.id
                    }
                  },
                  user: {
                    connect: {
                      id: loggedInUser.id
                    }
                  }
                }
              });
            case 22:
              message = _context.sent;
              _pusub["default"].publish(_constants.NEW_MESSAGE, {
                roomUpdates: _objectSpread({}, message)
              });
              return _context.abrupt("return", {
                ok: true,
                id: message.id
              });
            case 25:
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