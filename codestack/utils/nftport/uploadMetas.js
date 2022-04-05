const path = require("path");
const basePath = process.cwd();

const fs = require("fs");
const fetch = require("node-fetch")


fs.writeFileSync(`${basePath}/build/json/_ipfsMetas.json`,"")
const writer = fs.createWriteStream(`${basePath}/build/json/_ipfsMetas.json`,{
    flags:"a",

})
writer.write("[")
const readDir = `${basePath}/build/genericJson`
let fileCount = fs.readdirSync(readDir).length

fs.readdirSync(`${readDir}`).forEach((file) => {
  if (file =="_metadata.json"||file ==="_ipfsMetas.json")
  return
  const jsonFile = fs.readFileSync(`${readDir}/${file}`)

  let url = "https://api.nftport.xyz/v0/metadata";

  let options = {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      Authorization: "dd822bc2-d8cd-436a-9d6c-743ff94fee21",
     
    },
    body:jsonFile
  };

fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
      writer.write(JSON.stringify(json,null,2))
      fileCount--
      if(fileCount===0){
       
        writer.write(']')
        writer.end()
      }
      else{
        writer.write(",\n");
      }
      console.log(`${json.name} metadata uploaded and added to _ipfsMetas.json!`)

})
  .catch((err) => console.error("error:" + err));

});




 