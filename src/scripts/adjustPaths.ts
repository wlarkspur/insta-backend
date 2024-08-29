const fs = require("fs");
const path = require("path");

// 현재 디렉토리 경로
const currentDir = path.resolve();
console.log(`Current directory: ${currentDir}`);

// 빌드 디렉토리 경로 설정
const buildDir = path.join(currentDir, "build");
console.log(`Build directory: ${buildDir}`);

// 빌드 디렉토리 확인
if (!fs.existsSync(buildDir)) {
  console.error(`Build directory does not exist: ${buildDir}`);
  process.exit(1); // 오류가 발생하면 스크립트 종료
}

// 빌드 디렉토리 내용을 읽고 파일을 처리합니다.
fs.readdir(buildDir, (err, files) => {
  if (err) {
    console.error(`Unable to scan directory: ${err}`);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(buildDir, file);

    // 디렉토리는 처리하지 않음
    if (fs.statSync(filePath).isDirectory()) {
      console.log(`Skipping directory: ${filePath}`);
      return;
    }

    console.log(`Processing file: ${filePath}`);

    if (path.extname(file) === ".js") {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading file ${filePath}: ${err}`);
          return;
        }

        // 경로를 ../src/에서 ./으로 변경
        const result = data.replace(/(\.\.\/src\/)/g, "./");

        fs.writeFile(filePath, result, "utf8", (err) => {
          if (err) {
            console.error(`Error writing file ${filePath}: ${err}`);
          } else {
            console.log(`File updated: ${filePath}`);
          }
        });
      });
    }
  });
});
