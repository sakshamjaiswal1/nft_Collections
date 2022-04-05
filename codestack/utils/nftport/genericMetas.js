const path = require("path");
const basePath = process.cwd();

const fs = require("fs");
const fetch = require("node-fetch");
const buildDir = path.join(basePath,'/build')

if (!fs.existsSync(path.join(buildDir,'/genericJson'))){
    fs.mkdirSync(path.join(buildDir,"genericJson"))
}



fs.readdirSync(`${buildDir}/json`).forEach((file) => {
  if (file === "_metadata.json" || file === "_ipfsMetas.json") return;
  const jsonFile = JSON.parse(fs.readFileSync(`${buildDir}/json/${file}`));

 jsonFile.name="unknown"
 jsonFile.description="unknown"
 jsonFile.file_url="https://ipfs.io/ipfs/bafkreide4kwmh2l7ldpcfetvvgf6htp44rgqsq7xqnfzgztvfkpawbbpo4"
 delete jsonFile.attributes
 delete jsonFile.custom_fields.dna
 
 fs.writeFileSync(`${buildDir}/genericJson/${file}`,
 JSON.stringify(jsonFile,null,2))

console.log(`${file} copied and updated`)
});
