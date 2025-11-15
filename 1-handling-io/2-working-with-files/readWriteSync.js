const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "hello.txt");
const fileContent = fs.readFileSync(filePath, "utf8");
console.log("File content: ", fileContent.toString());

const upperContent = fileContent.toString().toUpperCase();
fs.writeFileSync(filePath, upperContent);

console.log("File updated.");
