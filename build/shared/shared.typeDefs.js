"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (0, apollo_server_1.gql) `
  type MutationResponse {
    ok: Boolean!
    id: Int
    error: String
  }
`;
