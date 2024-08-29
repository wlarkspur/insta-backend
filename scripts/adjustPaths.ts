import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES 모듈에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, "../build");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log(`Unable to scan directory: ${err}`);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    if (path.extname(file) === ".js") {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        const result = data.replace(/..\/src\//g, "./");

        fs.writeFile(filePath, result, "utf8", (err) => {
          if (err) console.log(err);
        });
      });
    }
  });
});
