const path = require("path");
const basePath = process.cwd();
const FormData = require("form-data");
const fs = require("fs");
const fetch = require("node-fetch")
fs.readdirSync(`${basePath}/build/json`).forEach((file) => {
  const formData = new FormData();
  const fileStream = fs.createReadStream(`${basePath}/build/images/${file}`);
  formData.append("file", fileStream);
  let url = "https://api.nftport.xyz/v0/files";
// console.log(formData)
  let options = {
    method: "POST",
    headers: {
    
      Authorization: "dd822bc2-d8cd-436a-9d6c-743ff94fee21",
     
    },
    body:formData
  };

fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
      console.log(json)
      const filename = path.parse(json.file_name).name
      let rawdata = fs.readFileSync(`${basePath}/build/json/${filename}.json`)
      let metadata = JSON.parse(rawdata)
      metadata.file_url = json.ipfs_url;
      fs.writeFileSync(`${basePath}/build/json/${filename}.json`,JSON.stringify(metadata,null,2))
      console.log(`${json.file_name} uploaded & ${filename}.json updated `)

})
  .catch((err) => console.error("error:" + err));

});




 