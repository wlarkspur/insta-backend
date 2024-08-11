import AWS from "aws-sdk";
import fs, { PathLike } from "fs";
import os from "os";
import path from "path";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
///
const saveStreamToTempFile = async (readStream, filename) => {
  const tempPath = path.join(os.tmpdir(), filename);
  const writeStream = fs.createWriteStream(tempPath);

  return new Promise((resolve, reject) => {
    readStream
      .pipe(writeStream)
      .on("finish", () => {
        console.log("Finished writing to temp file.");
        console.log(`Temp file path: ${tempPath}`);
        resolve(tempPath);
      })
      .on("error", (err) => {
        console.error("Error writing to temp file:", err);
        reject(err);
      });
  });
};
///

export const uploadToS3 = async (file, userId, folderName) => {
  try {
    //스트림 생성 (createReadStream)
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();

    // 스트림 상태 출력
    /* console.log("스트림 상태 초기:", {
      path: readStream.path, // 경로 확인
      readable: readStream.readable, // 스트림이 읽을 수 있는지 확인
      _readableState: readStream._readableState, // 내부 상태 확인
    }); */

    // 스트림을 임시 파일로 저장
    const tempFilePath = await saveStreamToTempFile(readStream, filename);
    // 임시 파일 경로 출력
    console.log("Temporary file path:", tempFilePath);

    // 임시 파일 크기 확인 코드 추가
    const fileSize = fs.statSync(tempFilePath as PathLike).size;
    console.log("임시 파일 크기:", fileSize);
    if (fileSize === 0) {
      throw new Error("임시 파일이 비어 있습니다. S3 업로드 중지");
    }

    // 임시 파일을 S3로 업로드
    const fileStream = fs.createReadStream(tempFilePath as any);
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;

    const { Location } = await new AWS.S3()
      .upload({
        Bucket: "wlarkspur-instaclone-uploads",
        Key: objectName,
        ACL: "public-read",
        Body: fileStream,
      })
      .promise();

    // 임시 파일 삭제
    fs.unlinkSync(tempFilePath as any);

    console.log("S3 업로드 성공 위치:", Location);
    return Location;
  } catch (error) {
    console.error("S3 Upload Error ㅠㅠ", error);
    throw error;
  }
};
