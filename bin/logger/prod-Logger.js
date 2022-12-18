const {format, createLogger, transports} = require('winston');
const path = require('path');



const buildProdLogger = () => {
   const logFormat = format.printf(({level, message, timestamp, meta}) => {
      return `${timestamp} ${meta.req.headers.origin} ${level}: ${message}`
   }) 

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
         }),
         new transports.Console({
            format: format.combine(
               format.json(),
               format.colorize(),
               format.timestamp({format: "YYYY-MM-dd HH:mm:ss"}),
               format.prettyPrint(),
               logFormat
            )
         }),
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