const fs = require('fs');
const path = require('path');

// create file 
 fs.writeFile(path.join(__dirname,'/test','test.txt'),'hello word',err => {
    if(err) throw err;
    console.log('File created');
 }
 );