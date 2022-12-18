const winston = require('winston');

const logFormat = winston.format.printf(({message}) => {
   return `${message}`
}) 

const errorHandler = winston.createLogger({
   
   transports: [
      new winston.transports.Console()
   ],
   format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize(),
      logFormat
   )
})


module.exports = errorHandler;