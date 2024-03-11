import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          const hashtags = caption.match(/#[\w|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g);
          hashtagObj = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
          console.log(hashtagObj);
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        // save the photo with the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};
export default resolvers;
