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

const folder = '27th single'

members.map((member) => {
  if (!member.graduation) {
    saveImageToDisk(`https://img.nogizaka46.com/www/member/img/${member.img}.jpg`, `./public/img/profile pic/${folder}/${member.img}.jpg`)
  }
})