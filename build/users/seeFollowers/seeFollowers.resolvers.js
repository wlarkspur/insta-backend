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
        seeFollowers: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, page }) {
            const ok = yield client_1.default.user.findMany({
                where: { username },
                select: { id: true },
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "User not found",
                };
            }
            const followers = yield client_1.default.user
                .findUnique({ where: { username } })
                .followers({
                take: 5,
                skip: (page - 1) * 5,
            });
            const totalFollowers = yield client_1.default.user.count({
                where: { following: { some: { username } } },
            });
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5),
            };
            //팔로워를 client.user.findMany 후 Javascript를 이용해서 단순계산시 많은 비용을 발생시킬 수 있다. client.user.count옵션이 있다.
        }),
    },
};
exports.default = resolvers;
