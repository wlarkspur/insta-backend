import { createWriteStream } from "fs";
import * as bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";
import { uploadToS3 } from "../../shared/shared.utils";

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
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
          /* const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`; */
        }
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
            ...(avatarUrl && { avatar: avatarUrl }),
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
