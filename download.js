import { members } from './src/members'
const fs = require('fs');
const https = require('https');

//Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
  const file = fs.createWriteStream(localPath);
  https.get(url, function (response) {
    response.pipe(file);
  });
}

const folder = '24'

members.map((member) => {
  saveImageToDisk(`https://img.nogizaka46.com/www/member/img/${member.img}.jpg`, `./public/img/${folder}/${member.img}.jpg`)
})