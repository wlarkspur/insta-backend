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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
exports.protectedResolver = protectedResolver;
const jwt = __importStar(require("jsonwebtoken"));
const client_1 = __importDefault(require("../client"));
const getUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            return null;
        }
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        if ("id" in verifiedToken) {
            const user = yield client_1.default.user.findUnique({
                where: {
                    id: verifiedToken["id"],
                },
            });
            if (user) {
                return user;
            }
        }
        return null;
    }
    catch (_a) {
        return null;
    }
});
exports.getUser = getUser;
function protectedResolver(ourResolver) {
    return function (root, args, context, info) {
        if (!context.loggedInUser) {
            const query = info.operation.operation === "query";
            if (query) {
                return null;
            }
            else {
                return {
                    ok: false,
                    error: "Please log in to perform this action. :)",
                };
            }
        }
        return ourResolver(root, args, context, info);
    };
}
//console.log(info) - info 인자는 GraphQL 리졸버 함수에서 네 번째 위치에 오며, 현재의 요청 및 필드에 대한 정보를 포함하는 객체입니다. 이 객체는 GraphQL 서버의 실행 단계에서 생성되며, 필드의 리졸버가 실행될 때마다 GraphQL 실행 엔진에 의해 리졸버 함수로 전달됩니다. info 객체는 API 사용자의 요청에 대한 상세한 메타데이터를 담고 있어, 리졸버의 동작을 동적으로 조정하거나, 복잡한 권한 검사, 로깅, 디버깅 등에 사용될 수 있습니다.
