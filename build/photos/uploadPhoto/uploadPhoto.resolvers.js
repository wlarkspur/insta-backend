"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _graphqlUploadTs = require("graphql-upload-ts");
var _client = _interopRequireDefault(require("../../client"));
var _shared = require("../../shared/shared.utils");
var _users = require("../../users/users.utils");
var _photos = require("../photos.utils");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var resolvers = {
  Upload: _graphqlUploadTs.GraphQLUpload,
  Mutation: {
    uploadPhoto: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var file, caption, loggedInUser, hashtagObj, _yield$file, createReadStream, filename, readStream, fileUrl;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              file = _ref.file, caption = _ref.caption;
              loggedInUser = _ref2.loggedInUser;
              hashtagObj = [];
              if (caption) {
                hashtagObj = (0, _photos.processHashtags)(caption);
              }
              console.log("전송받는 file 출력값", file);

              /// 아래 테스트용
              _context.next = 7;
              return file;
            case 7:
              _yield$file = _context.sent;
              createReadStream = _yield$file.createReadStream;
              filename = _yield$file.filename;
              readStream = createReadStream();
              console.log("스트림 상태:", {
                path: readStream.path,
                // 경로 확인
                readable: readStream.readable,
                // 스트림이 읽을 수 있는지 확인
                _readableState: readStream._readableState // 내부 상태 확인
              });
              readStream.on("end", function () {
                console.log("Stream ended.");
              });
              readStream.on("error", function (error) {
                console.error("Stream error:", error);
              });
              _context.next = 16;
              return (0, _shared.uploadToS3)({
                createReadStream: createReadStream,
                filename: filename
              }, loggedInUser.id, "uploads");
            case 16:
              fileUrl = _context.sent;
              return _context.abrupt("return", _client["default"].photo.create({
                data: _objectSpread({
                  file: fileUrl,
                  caption: caption,
                  user: {
                    connect: {
                      id: loggedInUser.id
                    }
                  }
                }, hashtagObj.length > 0 && {
                  hashtags: {
                    connectOrCreate: hashtagObj
                  }
                })
              }));
            case 18:
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