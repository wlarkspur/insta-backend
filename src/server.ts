import "dotenv/config";
import { ApolloServer, gql } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import { getUser, protectedResolver } from "../src/users/users.utils";

const PORT = process.env.PORT;
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
      protectedResolver,
    };
  },
});

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀 Server is running on http://localhost:${PORT}/ ✅`)
  );
