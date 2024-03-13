import { Resolvers } from "../../types";
import client from "../../client";

const resolvers: Resolvers = {
  Query: {
    seeHashtag: (_, { hashtag }) =>
      client.hashtag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
};

export default resolvers;
