import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
          const hashtags = caption.match(/#[\w|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g);
        }
        client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser,
              },
            },
            hashtags: {
              connectOrCreate: [
                {
                  where: {
                    hashtag: "#food",
                  },
                  create: {
                    hashtag: "#food",
                  },
                },
              ],
            },
          },
        });
        // save the photo with the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};
export default resolvers;
