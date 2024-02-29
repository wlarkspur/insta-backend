import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../client";

interface IAccount {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { firstName, lastName, username, email, password }: IAccount
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/email is already taken :)");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
    login: async (_: any, { username, password }: IAccount) => {
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
