"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = void 0;
exports.protectedResolver = protectedResolver;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var jwt = _interopRequireWildcard(require("jsonwebtoken"));
var _client = _interopRequireDefault(require("../client"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var verifiedToken, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (token) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", null);
        case 3:
          verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
          if (!("id" in verifiedToken)) {
            _context.next = 10;
            break;
          }
          _context.next = 7;
          return _client["default"].user.findUnique({
            where: {
              id: verifiedToken["id"]
            }
          });
        case 7:
          user = _context.sent;
          if (!user) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", user);
        case 10:
          return _context.abrupt("return", null);
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", null);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      var query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action. :)"
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}

//console.log(info) - info 인자는 GraphQL 리졸버 함수에서 네 번째 위치에 오며, 현재의 요청 및 필드에 대한 정보를 포함하는 객체입니다. 이 객체는 GraphQL 서버의 실행 단계에서 생성되며, 필드의 리졸버가 실행될 때마다 GraphQL 실행 엔진에 의해 리졸버 함수로 전달됩니다. info 객체는 API 사용자의 요청에 대한 상세한 메타데이터를 담고 있어, 리졸버의 동작을 동적으로 조정하거나, 복잡한 권한 검사, 로깅, 디버깅 등에 사용될 수 있습니다.