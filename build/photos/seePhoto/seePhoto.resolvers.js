"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
const resolvers = {
    Query: {
        seePhoto: (_, { id }) => client_1.default.photo.findUnique({
            where: {
                id,
            },
        }),
    },
};
exports.default = resolvers;
