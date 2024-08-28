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
var jwt = _interopRequireWildcard(require("jsonwebtoken"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var resolvers = {
  Mutation: {
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var username, password, client, user, passwordOk, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              username = _ref.username, password = _ref.password;
              client = _ref2.client;
              _context.next = 4;
              return client.user.findFirst({
                where: {
                  username: username
                }
              });
            case 4:
              user = _context.sent;
              if (user) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "User not found bro.."
              });
            case 7:
              _context.next = 9;
              return bcrypt.compare(password, user.password);
            case 9:
              passwordOk = _context.sent;
              if (passwordOk) {
                _context.next = 12;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "Incorrect password(Account locks after 2 failed logins.)"
              });
            case 12:
              token = jwt.sign({
                id: user.id
              }, process.env.SECRET_KEY);
              return _context.abrupt("return", {
                ok: true,
                token: token
              });
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function login(_x, _x2, _x3) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }
};
var _default = exports["default"] = resolvers;