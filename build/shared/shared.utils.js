"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToS3 = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _fs = _interopRequireDefault(require("fs"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
_awsSdk["default"].config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  }
});
///
var saveStreamToTempFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(readStream, filename) {
    var tempPath, writeStream;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          tempPath = _path["default"].join(_os["default"].tmpdir(), filename);
          writeStream = _fs["default"].createWriteStream(tempPath);
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            readStream.pipe(writeStream).on("finish", function () {
              console.log("Finished writing to temp file.");
              console.log("Temp file path: ".concat(tempPath));
              resolve(tempPath);
            }).on("error", function (err) {
              console.error("Error writing to temp file:", err);
              reject(err);
            });
          }));
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function saveStreamToTempFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
///

var uploadToS3 = exports.uploadToS3 = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(file, userId, folderName) {
    var _yield$file, filename, createReadStream, readStream, tempFilePath, fileSize, fileStream, objectName, _yield$AWS$S3$upload$, Location;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return file;
        case 3:
          _yield$file = _context2.sent;
          filename = _yield$file.filename;
          createReadStream = _yield$file.createReadStream;
          readStream = createReadStream(); // 스트림을 임시 파일로 저장
          _context2.next = 9;
          return saveStreamToTempFile(readStream, filename);
        case 9:
          tempFilePath = _context2.sent;
          // 임시 파일 경로 출력
          console.log("Temporary file path:", tempFilePath);

          // 임시 파일 크기 확인 코드 추가
          fileSize = _fs["default"].statSync(tempFilePath).size;
          console.log("임시 파일 크기:", fileSize);
          if (!(fileSize === 0)) {
            _context2.next = 15;
            break;
          }
          throw new Error("임시 파일이 비어 있습니다. S3 업로드 중지");
        case 15:
          // 임시 파일을 S3로 업로드
          fileStream = _fs["default"].createReadStream(tempFilePath);
          objectName = "".concat(folderName, "/").concat(userId, "-").concat(Date.now(), "-").concat(filename);
          _context2.next = 19;
          return new _awsSdk["default"].S3().upload({
            Bucket: "wlarkspur-instaclone-uploads",
            Key: objectName,
            ACL: "public-read",
            Body: fileStream
          }).promise();
        case 19:
          _yield$AWS$S3$upload$ = _context2.sent;
          Location = _yield$AWS$S3$upload$.Location;
          // 임시 파일 삭제
          _fs["default"].unlinkSync(tempFilePath);
          console.log("S3 업로드 성공 위치:", Location);
          return _context2.abrupt("return", Location);
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](0);
          console.error("S3 Upload Error ㅠㅠ", _context2.t0);
          throw _context2.t0;
        case 30:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 26]]);
  }));
  return function uploadToS3(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();