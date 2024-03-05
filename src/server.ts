import "dotenv/config";
import { ApolloServer, gql } from "apollo-server";
import schema from "./schema";
import client from "./client";
import { getUser, protectedResolver } from "../src/users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
      protectedResolver,
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀 Server is running on http://localhost:${PORT}/ ✅`)
  );
