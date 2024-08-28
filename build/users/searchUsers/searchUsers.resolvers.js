"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
const resolvers = {
    Query: {
        searchUsers: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { keyword, lastId }) {
            const page_size = 5;
            const searchUsers = yield client_1.default.user.findMany(Object.assign({ where: {
                    username: {
                        startsWith: keyword.toLowerCase(),
                    },
                }, take: page_size, skip: lastId ? 1 : 0 }, (lastId && { cursor: { id: lastId } })));
            console.log(searchUsers);
            return searchUsers;
        }),
    },
};
exports.default = resolvers;
