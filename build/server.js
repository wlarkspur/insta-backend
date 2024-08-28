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
require("dotenv").config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
const client_1 = __importDefault(require("./client"));
const users_utils_1 = require("./users/users.utils");
const pusub_1 = __importDefault(require("./pusub"));
console.log(pusub_1.default);
const PORT = process.env.PORT;
const apollo = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: schema_1.resolvers,
    uploads: false, //Apollo Server 3.x 이하에서는 이 옵션을 설정해야 한다 ??
    playground: true,
    //ctx는 HTTP or websocket context가 될 수 있다.
    context: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.req) {
            return {
                loggedInUser: yield (0, users_utils_1.getUser)(ctx.req.headers.token),
                client: client_1.default,
                protectedResolver: users_utils_1.protectedResolver,
            };
        }
        else {
            const { connection: { context }, } = ctx;
            return {
                loggedInUser: context.loggedInUser,
            };
        }
    }),
    subscriptions: {
        onConnect: (_a) => __awaiter(void 0, [_a], void 0, function* ({ token }) {
            /* console.log(token); */
            if (!token) {
                throw new Error("You can't listen");
            } // token authentication option은 public설정시 삭제해도 됨.
            const loggedInUser = yield (0, users_utils_1.getUser)(token);
            return {
                loggedInUser,
            };
        }),
    },
});
//Web Socket 에는 req,res 가 없다.
const app = (0, express_1.default)();
app.use((0, graphql_upload_ts_1.graphqlUploadExpress)({
    maxFileSize: 50000000,
    maxFiles: 10,
    overrideSendResponse: false,
}));
app.use((0, morgan_1.default)("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express_1.default.static("uploads"));
const httpServer = http_1.default.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql ✅`);
});
