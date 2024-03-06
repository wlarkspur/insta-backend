import { createWriteStream } from "fs";
import * as bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          password: newpassword,
          bio,
          avatar,
        },
        { loggedInUser, client }
      ) => {
        //토큰을 내가 만들고, 변경되지 않았음을 확인.
        // id 는 verifiedToken 값의 id를 의미.
        const { filename, createReadStream } = await avatar;
        const readStream = createReadStream();
        const writeStream =
          createWriteStream(process.cwd()) + "/uploads/" + filename;
        readStream.pipe(writeStream);
        let uglyPassword = null;
        if (newpassword) {
          uglyPassword = await bcrypt.hash(newpassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser?.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,

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

export default resolvers;
