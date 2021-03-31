const fs = require('fs');
const execSync = require('child_process').execSync;

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

deleteFolderRecursive("./dist");

// run the parcel scripts
let parcel_scripts = 'parcel build src/index.html --no-content-hash --no-source-maps --experimental-scope-hoisting'; 

console.log(execSync(parcel_scripts, {encoding: 'utf8'}));

execSync("cp src/robots.txt dist/robots.txt", {encoding: 'utf8'});
console.log("dist/robots.txt added");

execSync("cp src/humans.txt dist/humans.txt", {encoding: 'utf8'});
console.log("dist/humans.txt added");