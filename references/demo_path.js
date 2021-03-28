const path = require('path');

// base file name
console.log(path.basename(__filename));

// directory name
console.log(path.dirname(__filename));

// create path object 

console.log(path.parse(__filename));

