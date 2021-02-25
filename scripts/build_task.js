const execSync = require('child_process').execSync;

// run the parcel scripts
let parcel_scripts = 'parcel build src/index.html';

console.log(execSync(parcel_scripts, {encoding: 'utf8'}));

execSync("cp src/robots.txt dist/robots.txt", {encoding: 'utf8'});
console.log("dist/robots.txt added");

execSync("cp src/humans.txt dist/humans.txt", {encoding: 'utf8'});
console.log("dist/humans.txt added");