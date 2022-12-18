const {format, createLogger, transports} = require('winston');

const buildDevLogger = () => {
   const logFormat = format.printf(({level, message, timestamp, meta}) => {
      return `${timestamp} ${meta.req.headers.origin} ${level}: ${message}`
   }) 
   
   return createLogger({
      transports: [
         new transports.Console(),
      ],
      format: format.combine(
         format.json(),
         format.colorize(),
         format.timestamp({format: "YYYY-MM-dd HH:mm:ss"}),
         format.prettyPrint(),
         logFormat
      )
   })
}

module.exports = buildDevLogger;