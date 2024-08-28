"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
aws_sdk_1.default.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});
///
const saveStreamToTempFile = (readStream, filename) => __awaiter(void 0, void 0, void 0, function* () {
    const tempPath = path_1.default.join(os_1.default.tmpdir(), filename);
    const writeStream = fs_1.default.createWriteStream(tempPath);
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
});
///
const uploadToS3 = (file, userId, folderName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //스트림 생성 (createReadStream)
        const { filename, createReadStream } = yield file;
        const readStream = createReadStream();
        // 스트림을 임시 파일로 저장
        const tempFilePath = yield saveStreamToTempFile(readStream, filename);
        // 임시 파일 경로 출력
        console.log("Temporary file path:", tempFilePath);
        // 임시 파일 크기 확인 코드 추가
        const fileSize = fs_1.default.statSync(tempFilePath).size;
        console.log("임시 파일 크기:", fileSize);
        if (fileSize === 0) {
            throw new Error("임시 파일이 비어 있습니다. S3 업로드 중지");
        }
        // 임시 파일을 S3로 업로드
        const fileStream = fs_1.default.createReadStream(tempFilePath);
        const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
        const { Location } = yield new aws_sdk_1.default.S3()
            .upload({
            Bucket: "wlarkspur-instaclone-uploads",
            Key: objectName,
            ACL: "public-read",
            Body: fileStream,
        })
            .promise();
        // 임시 파일 삭제
        fs_1.default.unlinkSync(tempFilePath);
        console.log("S3 업로드 성공 위치:", Location);
        return Location;
    }
    catch (error) {
        console.error("S3 Upload Error ㅠㅠ", error);
        throw error;
    }
});
exports.uploadToS3 = uploadToS3;
