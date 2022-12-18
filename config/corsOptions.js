const whiteList = require('./corsWhiteList.js');

const corsOptions = {
   origin: (origin, callback) => {
      if(whiteList.includes(origin) || !origin){
         callback(null, true)
      } else {
         callback(new Error("Not allowed by CORS"))
      }
   },
   optionsSuccessStatus: 200
}

module.exports = corsOptions;