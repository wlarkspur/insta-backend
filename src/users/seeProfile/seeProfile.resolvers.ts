import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }, { client }) =>
      client.user.findUnique({
        where: {
          username,
        },
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};

export default resolvers;

//protectedResolver 로 seeProfile를 감쌀경우 오류가 null 값을 return 하는 오류가 발생하는데 아직 원인 불명...
