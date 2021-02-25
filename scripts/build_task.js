
const execSync = require('child_process').execSync;

// run the parcel scripts
let parcel_scripts = 'parcel build src/js/index.js --global window -o /index.min.js --no-content-hash --no-source-maps --experimental-scope-hoisting';

console.log(execSync(parcel_scripts, {encoding: 'utf8'}));
// LICENSE
execSync("cp LICENSE dist/", {encoding: 'utf8'});
console.log("dist\\LICENSE\n");
// README
execSync("cp README_NPM.md dist/README.md", {encoding: 'utf8'});
console.log("dist\\README.md\n");
// run npm_package.js
console.log(execSync("node scripts/npm_package.js", {encoding: 'utf8'}));
// final messages
console.log(`Package files are now ready in ./dist\n`);

console.log("NPM package can now be tested and published.\n");
console.log("Test npm package:\nnpm pack dist/\n\nDeploy npm package:\nnpm publish dist/");