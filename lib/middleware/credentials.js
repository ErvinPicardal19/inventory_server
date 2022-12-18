const whiteList = require('../../config/corsWhiteList.js');

const credentials = (req, res, next) => {
   const origin = req.headers.origin
   if(whiteList.includes(origin)){
      res.append("Access-Control-Allow-Credentials", true);
   }
   next();
}

module.exports = credentials;