"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var bcrypt = _interopRequireWildcard(require("bcrypt"));
var _users = require("../users.utils");
var _shared = require("../../shared/shared.utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var resolvers = {
  Mutation: {
    editProfile: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var firstName, lastName, username, email, newpassword, bio, avatar, loggedInUser, client, avatarUrl, uglyPassword, updatedUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              firstName = _ref.firstName, lastName = _ref.lastName, username = _ref.username, email = _ref.email, newpassword = _ref.password, bio = _ref.bio, avatar = _ref.avatar;
              loggedInUser = _ref2.loggedInUser, client = _ref2.client;
              //토큰을 내가 만들고, 변경되지 않았음을 확인.
              // id 는 verifiedToken 값의 id를 의미.
              avatarUrl = null;
              if (!avatar) {
                _context.next = 7;
                break;
              }
              _context.next = 6;
              return (0, _shared.uploadToS3)(avatar, loggedInUser.id, "avatars");
            case 6:
              avatarUrl = _context.sent;
            case 7:
              uglyPassword = null;
              if (!newpassword) {
                _context.next = 12;
                break;
              }
              _context.next = 11;
              return bcrypt.hash(newpassword, 10);
            case 11:
              uglyPassword = _context.sent;
            case 12:
              _context.next = 14;
              return client.user.update({
                where: {
                  id: loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id
                },
                data: _objectSpread(_objectSpread({
                  firstName: firstName,
                  lastName: lastName,
                  username: username,
                  email: email,
                  bio: bio
                }, uglyPassword && {
                  password: uglyPassword
                }), avatarUrl && {
                  avatar: avatarUrl
                })
              });
            case 14:
              updatedUser = _context.sent;
              if (!updatedUser.id) {
                _context.next = 19;
                break;
              }
              return _context.abrupt("return", {
                ok: true
              });
            case 19:
              return _context.abrupt("return", {
                ok: false,
                error: "Could not update profile :("
              });
            case 20:
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