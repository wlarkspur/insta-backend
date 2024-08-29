"use strict";

var fs = require("fs");
var path = require("path");

// 현재 디렉토리 경로
var currentDir = path.resolve();
console.log("Current directory: ".concat(currentDir));

// 빌드 디렉토리 경로 설정
var buildDir = path.join(currentDir, "build");
console.log("Build directory: ".concat(buildDir));

// 빌드 디렉토리 확인
if (!fs.existsSync(buildDir)) {
  console.error("Build directory does not exist: ".concat(buildDir));
  process.exit(1); // 오류가 발생하면 스크립트 종료
}

// 빌드 디렉토리 내용을 읽고 파일을 처리합니다.
fs.readdir(buildDir, function (err, files) {
  if (err) {
    console.error("Unable to scan directory: ".concat(err));
    return;
  }
  files.forEach(function (file) {
    var filePath = path.join(buildDir, file);

    // 디렉토리는 처리하지 않음
    if (fs.statSync(filePath).isDirectory()) {
      console.log("Skipping directory: ".concat(filePath));
      return;
    }
    console.log("Processing file: ".concat(filePath));
    if (path.extname(file) === ".js") {
      fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
          console.error("Error reading file ".concat(filePath, ": ").concat(err));
          return;
        }

        // 경로를 ../src/에서 ./으로 변경
        var result = data.replace(/(\.\.\/src\/)/g, "./");
        fs.writeFile(filePath, result, "utf8", function (err) {
          if (err) {
            console.error("Error writing file ".concat(filePath, ": ").concat(err));
          } else {
            console.log("File updated: ".concat(filePath));
          }
        });
      });
    }
  });
});