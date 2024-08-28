"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  Comment: {
    isMine: function isMine(_ref, _, _ref2) {
      var userId = _ref.userId;
      var loggedInUser = _ref2.loggedInUser;
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    }
  }
};