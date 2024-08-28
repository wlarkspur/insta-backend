"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apolloServerExpress = require("apollo-server-express");
var _constants = require("../../constants");
var _pusub = _interopRequireDefault(require("../../pusub"));
var _client = _interopRequireDefault(require("../../client"));
var _default = exports["default"] = {
  Subscription: {
    roomUpdates: {
      subscribe: function () {
        var _subscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(root, args, context, info) {
          var room;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _client["default"].room.findFirst({
                  where: {
                    id: args.id,
                    users: {
                      some: {
                        id: context.loggedInUser.id
                      }
                    }
                  },
                  select: {
                    id: true
                  }
                });
              case 2:
                room = _context.sent;
                if (room) {
                  _context.next = 5;
                  break;
                }
                throw new Error("You shall not see this :)");
              case 5:
                return _context.abrupt("return", (0, _apolloServerExpress.withFilter)(function () {
                  return _pusub["default"].asyncIterator(_constants.NEW_MESSAGE);
                }, function (_ref, _ref2, _ref3) {
                  var roomUpdates = _ref.roomUpdates;
                  var id = _ref2.id;
                  var loggedInUser = _ref3.loggedInUser;
                  console.log(loggedInUser);
                  return roomUpdates.roomId === id;
                })(root, args, context, info));
              case 6:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        function subscribe(_x, _x2, _x3, _x4) {
          return _subscribe.apply(this, arguments);
        }
        return subscribe;
      }()
    }
  }
};
/* 
export default {
  Subscription: {
    roomUpdates: {
      subscribe:()=>pubsub.asyncIterator(NEW_MESSAGE)
    }
  }
} */