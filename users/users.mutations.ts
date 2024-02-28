import bcrypt from "bcrypt";
import client from "../client";

interface ICreateAccount {
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
      { firstName, lastName, username, email, password }: ICreateAccount
    ) => {
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
      console.log(existingUser);
      const uglyPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: { username, email, firstName, lastName, password: uglyPassword },
      });
      // hash password
      // asve and return the user
    },
  },
};
