import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pusub";
import { Resolvers } from "../../types";
import client from "../../client";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findUnique({
          where: {
            id: args.id,
          },
          select: {
            id: true,
          },
        });
        if (!room) {
          throw new Error("You shall not see this :)");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ roomUpdates }, { id }) => {
            return roomUpdates.roomId === id;
            return true;
          }
        )(root, args, context, info);
      },
    },
  },
};
