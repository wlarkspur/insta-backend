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
const graphql_upload_ts_1 = require("graphql-upload-ts");
const client_1 = __importDefault(require("../../client"));
const shared_utils_1 = require("../../shared/shared.utils");
const users_utils_1 = require("../../users/users.utils");
const photos_utils_1 = require("../photos.utils");
const resolvers = {
    Upload: graphql_upload_ts_1.GraphQLUpload,
    Mutation: {
        uploadPhoto: (0, users_utils_1.protectedResolver)((_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { file, caption }, { loggedInUser }) {
            let hashtagObj = [];
            if (caption) {
                hashtagObj = (0, photos_utils_1.processHashtags)(caption);
            }
            console.log("전송받는 file 출력값", file);
            /// 아래 테스트용
            const { createReadStream, filename } = yield file;
            const readStream = createReadStream();
            console.log("스트림 상태:", {
                path: readStream.path, // 경로 확인
                readable: readStream.readable, // 스트림이 읽을 수 있는지 확인
                _readableState: readStream._readableState, // 내부 상태 확인
            });
            readStream.on("end", () => {
                console.log("Stream ended.");
            });
            readStream.on("error", (error) => {
                console.error("Stream error:", error);
            });
            const fileUrl = yield (0, shared_utils_1.uploadToS3)({ createReadStream, filename }, loggedInUser.id, "uploads");
            ///
            /* const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads"); */
            return client_1.default.photo.create({
                data: Object.assign({ file: fileUrl, caption, user: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    } }, (hashtagObj.length > 0 && {
                    hashtags: {
                        connectOrCreate: hashtagObj,
                    },
                })),
            });
            // save the photo with the parsed hashtags
            // add the photo to the hashtags
        })),
    },
};
exports.default = resolvers;
