import { GraphQLUpload } from "graphql-upload-ts";
import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        }

        console.log("전송받는 file 출력값", file);

        /// 아래 테스트용
        const { createReadStream, filename } = await file;

        const readStream = createReadStream();

        console.log("스트림 상태:", {
          path: readStream.path, // 경로 확인
          readable: readStream.readable, // 스트림이 읽을 수 있는지 확인
          _readableState: readStream._readableState, // 내부 상태 확인
        });

        readStream.on("end", () => {
          console.log("Stream ended.");
        });

        readStream.on("error", (error) => {
          console.error("Stream error:", error);
        });

        const fileUrl = await uploadToS3(
          { createReadStream, filename },
          loggedInUser.id,
          "uploads"
        );

        ///
        /* const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads"); */
        return client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        // save the photo with the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};
export default resolvers;
