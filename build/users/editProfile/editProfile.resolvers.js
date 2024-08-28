"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const users_utils_1 = require("../users.utils");
const shared_utils_1 = require("../../shared/shared.utils");
const resolvers = {
    Mutation: {
        editProfile: (0, users_utils_1.protectedResolver)((_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { firstName, lastName, username, email, password: newpassword, bio, avatar, }, { loggedInUser, client }) {
            //토큰을 내가 만들고, 변경되지 않았음을 확인.
            // id 는 verifiedToken 값의 id를 의미.
            let avatarUrl = null;
            if (avatar) {
                avatarUrl = yield (0, shared_utils_1.uploadToS3)(avatar, loggedInUser.id, "avatars");
                /* const { filename, createReadStream } = await avatar;
                const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
                const readStream = createReadStream();
                const writeStream = createWriteStream(
                  process.cwd() + "/uploads/" + newFilename
                );
                readStream.pipe(writeStream);
                avatarUrl = `http://localhost:4000/static/${newFilename}`; */
            }
            let uglyPassword = null;
            if (newpassword) {
                uglyPassword = yield bcrypt.hash(newpassword, 10);
            }
            const updatedUser = yield client.user.update({
                where: {
                    id: loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id,
                },
                data: Object.assign(Object.assign({ firstName,
                    lastName,
                    username,
                    email,
                    bio }, (uglyPassword && { password: uglyPassword })), (avatarUrl && { avatar: avatarUrl })),
            });
            if (updatedUser.id) {
                return {
                    ok: true,
                };
            }
            else {
                return {
                    ok: false,
                    error: "Could not update profile :(",
                };
            }
        })),
    },
};
exports.default = resolvers;
