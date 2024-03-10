import { skip } from "node:test";
import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }) => {
      const page_size = 5;
      const searchUsers = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: page_size,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      console.log(searchUsers);
      return searchUsers;
    },
  },
};

export default resolvers;
