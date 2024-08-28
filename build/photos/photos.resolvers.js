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
const client_1 = __importDefault(require("../client"));
exports.default = {
    Photo: {
        user: ({ userId }) => {
            return client_1.default.user.findUnique({ where: { id: userId } });
        },
        hashtags: ({ id }) => {
            return client_1.default.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id,
                        },
                    },
                },
            });
        },
        likes: ({ id }) => client_1.default.like.count({ where: { photoId: id } }),
        commentNumber: ({ id }) => client_1.default.comment.count({ where: { photoId: id } }),
        comments: ({ id }) => client_1.default.comment.findMany({
            where: { photoId: id },
            include: {
                user: true,
            },
        }),
        isMine: ({ userId }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return userId === loggedInUser.id;
        },
        isLiked: (_a, _1, _b) => __awaiter(void 0, [_a, _1, _b], void 0, function* ({ id }, _, { loggedInUser }) {
            if (!loggedInUser) {
                return false;
            }
            const ok = yield client_1.default.like.findUnique({
                where: {
                    photoId_userId: {
                        photoId: id,
                        userId: loggedInUser.id,
                    },
                },
                select: {
                    id: true,
                },
            });
            //현재 loggedInUser 본인의 like가 있어야 ok = true가 된다.
            //왜 이렇게 강의에서 하는지 일단 지켜보고 수정필요,
            // where 단에서 userId: loggedInUser.id 변수를 지우면 해결될 것
            if (ok) {
                return true;
            }
            return false;
        }),
    },
    Hashtag: {
        photos: ({ id }, { page }, { loggedInUser }) => {
            return client_1.default.hashtag
                .findUnique({
                where: {
                    id,
                },
            })
                .photos({
                take: 2,
                skip: (page - 1) * 2,
            });
            //photo()안의 코드는 pagination을 구현해 봄
        },
        totalPhotos: ({ id }) => client_1.default.photo.count({
            where: {
                hashtags: {
                    some: {
                        id,
                    },
                },
            },
        }),
    },
};
