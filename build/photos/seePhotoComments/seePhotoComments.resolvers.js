"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
const resolvers = {
    Query: {
        seePhotoComments: (_, { id, lastId }) => client_1.default.comment.findMany(Object.assign(Object.assign({ where: {
                photoId: id,
            }, take: 5, skip: lastId ? 1 : 0 }, (lastId && { cursor: { id: lastId } })), { orderBy: {
                createdAt: "desc",
            } })),
    },
};
exports.default = resolvers;
