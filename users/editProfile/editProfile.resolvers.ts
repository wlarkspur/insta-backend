import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../../client";
import { protectedResolver } from "../users.utils";

interface IEditProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _: any,
        {
          firstName,
          lastName,
          username,
          email,
          password: newpassword,
        }: IEditProfile,
        { loggedInUser }: any
      ) => {
        //토큰을 내가 만들고, 변경되지 않았음을 확인.
        // id 는 verifiedToken 값의 id를 의미.

        let uglyPassword = null;
        if (newpassword) {
          uglyPassword = await bcrypt.hash(newpassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
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
      }
    ),
  },
};
