import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pusub";
import { Resolvers } from "../../types";
import client from "../../client";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        /* console.log(context); */
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id,
              },
            },
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
          ({ roomUpdates }, { id }, { loggedInUser }) => {
            console.log(loggedInUser);
            return roomUpdates.roomId === id;
          }
        )(root, args, context, info); //뒤에 root...후 값 들은 return
      },
    },
  },
};

/* 
export default {
  Subscription: {
    roomUpdates: {
      subscribe:()=>pubsub.asyncIterator(NEW_MESSAGE)
    }
  }
} */
