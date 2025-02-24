const winston = require('winston');
const { combine, timestamp, json } = winston.format;

// Logger setup with winston
const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
//  format: winston.format.json(),
//   format: winston.format.combine(
//     winston.format.json(),
//     winston.format.timestamp(),
//     //winston.format.prettyPrint()
//   ),
  transports: [
    // new winston.transports.Console({
    //   format: winston.format.simple(),
    // }),
    //    
    //- Write all logs with importance level of `error` or higher to `error.log`
    //  (i.e., error, fatal, but not other levels)
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    
    //- Write all logs with importance level of `info` or higher to `combined.log`
    //  (i.e., fatal, error, warn, and info, but not trace)
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

module.exports = logger;
