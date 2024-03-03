import bcrypt from "bcrypt";
import client from "../../client";

interface IEditProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default {
  Mutation: {
    editProfile: async (
      _: any,
      {
        firstName,
        lastName,
        username,
        email,
        password: newpassword,
      }: IEditProfile
    ) => {
      let uglyPassword = null;
      if (newpassword) {
        uglyPassword = await bcrypt.hash(newpassword, 10);
      }
      const updatedUser = await client.user.update({
        where: { id: 1 },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Could not update profile :(",
        };
      }
    },
  },
};
