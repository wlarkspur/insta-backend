"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _apolloServer = require("apollo-server");
var _templateObject;
var _default = exports["default"] = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Message {\n    id: Int!\n    payload: String!\n    user: User!\n    room: Room!\n    read: Boolean!\n    createdAt: String!\n    updatedAt: String!\n  }\n  type Room {\n    id: Int!\n    unreadTotal: Int!\n    users: [User]\n    messages: [Message]\n    createdAt: String!\n    updatedAt: String!\n  }\n"])));