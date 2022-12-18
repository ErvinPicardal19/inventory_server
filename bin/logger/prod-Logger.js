const {format, createLogger, transports} = require('winston');
const path = require('path');



const buildProdLogger = () => {

   return createLogger({
      transports: [
         new transports.File({
            level: "info",
            filename: path.join(__dirname, '..', '..', 'logs', 'logs', 'requestLogs.log')
         }),
         new transports.File({
            level: "warn",
            filename: path.join(__dirname, '..', '..', 'logs', 'warnLogs.log')
         }),
         new transports.File({
            level: "error",
            filename: path.join(__dirname, '..', '..', 'logs', 'errorLogs.log')
         })
      ],
      format: format.combine(
         format.json(),
         format.timestamp(),
         format.metadata(),
         format.prettyPrint()
      )
   })
}


module.exports = buildProdLogger;