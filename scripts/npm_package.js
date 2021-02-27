const fs = require('fs');
const stream = fs.createWriteStream("package/package.json");
const path = require('path');
const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, 'package.json'));

let package_details =
`{
  "name": "@dunks1980/inline.svg",
  "version": ${JSON.stringify(PACKAGE.version)},
  "description": ${JSON.stringify(PACKAGE.description)},
  "main": "index.min.js",
  "author": ${JSON.stringify(PACKAGE.author)},
  "license": ${JSON.stringify(PACKAGE.license)},
  "homepage": ${JSON.stringify(PACKAGE.homepage)},
  "keywords": ${JSON.stringify(PACKAGE.keywords)},
  "repository": ${JSON.stringify(PACKAGE.repository)},
  "bugs": ${JSON.stringify(PACKAGE.bugs)}
}`;

stream.once('open', function(fd) {
  stream.write(package_details);
  stream.end();
});

console.log("package\\package.json v" + PACKAGE.version);