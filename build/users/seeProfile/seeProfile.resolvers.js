"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var resolvers = {
  Query: {
    seeProfile: function seeProfile(_, _ref, _ref2) {
      var username = _ref.username;
      var client = _ref2.client;
      return client.user.findUnique({
        where: {
          username: username
        },
        include: {
          following: true,
          followers: true
        }
      });
    }
  }
};
var _default = exports["default"] = resolvers; //protectedResolver 로 seeProfile를 감쌀경우 오류가 null 값을 return 하는 오류가 발생하는데 아직 원인 불명...