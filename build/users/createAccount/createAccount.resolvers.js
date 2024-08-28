"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var bcrypt = _interopRequireWildcard(require("bcrypt"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var resolvers = {
  Mutation: {
    createAccount: function () {
      var _createAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var firstName, lastName, username, email, password, client, existingUser, uglyPassword;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              firstName = _ref.firstName, lastName = _ref.lastName, username = _ref.username, email = _ref.email, password = _ref.password;
              client = _ref2.client;
              _context.prev = 2;
              _context.next = 5;
              return client.user.findFirst({
                where: {
                  OR: [{
                    username: username
                  }, {
                    email: email
                  }]
                }
              });
            case 5:
              existingUser = _context.sent;
              if (!existingUser) {
                _context.next = 8;
                break;
              }
              throw new Error("This username/email is already taken :)");
            case 8:
              _context.next = 10;
              return bcrypt.hash(password, 10);
            case 10:
              uglyPassword = _context.sent;
              _context.next = 13;
              return client.user.create({
                data: {
                  username: username,
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  password: uglyPassword
                }
              });
            case 13:
              return _context.abrupt("return", {
                ok: true
              });
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", {
                ok: false,
                error: "Can't create account"
              });
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 16]]);
      }));
      function createAccount(_x, _x2, _x3) {
        return _createAccount.apply(this, arguments);
      }
      return createAccount;
    }()
  }
};
var _default = exports["default"] = resolvers;