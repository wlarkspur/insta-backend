import { graphqlUploadExpress } from "graphql-upload-ts";
require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import { getUser, protectedResolver } from "../src/users/users.utils";
import pubsub from "./pusub";

console.log(pubsub);

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false, //Apollo Server 3.x 이하에서는 이 옵션을 설정해야 한다 ??
  playground: true,
  introspection: true,
  //ctx는 HTTP or websocket context가 될 수 있다.
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        client,
        protectedResolver,
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }: any) => {
      /* console.log(token); */
      if (!token) {
        throw new Error("You can't listen");
      } // token authentication option은 public설정시 삭제해도 됨.
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

//Web Socket 에는 req,res 가 없다.

const app = express();
app.use(
  graphqlUploadExpress({
    maxFileSize: 50000000,
    maxFiles: 10,
    overrideSendResponse: false,
  })
);
app.use(logger("tiny"));
apollo.applyMiddleware({ app });

app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql ✅`);
});
