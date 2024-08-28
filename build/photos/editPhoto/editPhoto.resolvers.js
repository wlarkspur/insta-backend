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
const users_utils_1 = require("../../users/users.utils");
const photos_utils_1 = require("../photos.utils");
exports.default = {
    Mutation: {
        editPhoto: (0, users_utils_1.protectedResolver)((_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { id, caption }, { loggedInUser }) {
            const oldPhoto = yield client_1.default.photo.findFirst({
                where: {
                    id,
                    userId: loggedInUser.id,
                },
                include: {
                    hashtags: {
                        select: {
                            hashtag: true,
                        },
                    },
                },
            });
            if (!oldPhoto) {
                return {
                    ok: false,
                    error: "Photo not found.",
                };
            }
            const photo = yield client_1.default.photo.update({
                where: {
                    id,
                },
                data: {
                    caption,
                    hashtags: {
                        disconnect: oldPhoto.hashtags,
                        connectOrCreate: (0, photos_utils_1.processHashtags)(caption),
                    },
                },
            });
            return {
                ok: true,
            };
        })),
    },
};
