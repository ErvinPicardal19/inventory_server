const path = require('path');
const buildDevLogger = require(path.join(__dirname, "dev-Logger.js"));
const buildProdLogger = require(path.join(__dirname, "prod-Logger.js"));

let logger = () => {
   if(process.env.NODE_ENV?.trim() === "development"){
      console.log("====================================")
      console.log('\x1b[42m\x1b[30m%s\x1b[0m', 'Developer Mode');
      console.log("====================================")
      return buildDevLogger();
   } else {
      console.log("====================================")
      console.log('\x1b[42m\x1b[30m%s\x1b[0m', 'Production Mode');
      console.log("====================================")
      return buildProdLogger();
   }

}

module.exports = logger;