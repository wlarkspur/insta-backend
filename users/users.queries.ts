import client from "../client";

interface IProfile {
  username: string;
}

export default {
  Query: {
    seeProfile: (_: any, { username }: IProfile) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};
