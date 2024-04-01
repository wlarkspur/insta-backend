import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pusub";
import { Resolvers } from "../../types";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
    },
  },
};
