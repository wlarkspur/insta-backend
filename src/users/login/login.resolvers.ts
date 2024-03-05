import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found bro..",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password(Account locks after 2 failed logins.)",
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!);
      return {
        ok: true,
        token,
      };
      // 토큰은 비밀이 아니라, 변경할 수 없도록 할 뿐이다. (jwt.io <= 확인)
      // check password with args.password
      // issue a token and send it to the user
    },
  },
};

export default resolvers;
