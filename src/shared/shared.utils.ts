import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const fs = require("fs");
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "wlarkspur-instaclone-uploads",
      Key: objectName,
      ACL: "public-read",
      /* Body: readStream, */
      Body: fs.createReadStream(readStream._writeStream.path),
    })
    .promise();

  return Location;
};
