const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../build");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    if (path.extname(file) === ".js") {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        let result = data.replace(/..\/src\//g, "./");

        fs.writeFile(filePath, result, "utf8", (err) => {
          if (err) console.log(err);
        });
      });
    }
  });
});
