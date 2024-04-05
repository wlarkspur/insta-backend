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
  resolvers,
  typeDefs,
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
    onConnect: async ({ token }: { token?: string }) => {
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
app.use(logger("tiny"));
apollo.applyMiddleware({ app });

app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql ✅`);
});
