"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  type Query {
    searchUsers(keyword: String!, lastId: Int): [User]
  }
`;
/* type searchUsersResult {
  searchedUsers: [User]
  totalPages: Int
} */
