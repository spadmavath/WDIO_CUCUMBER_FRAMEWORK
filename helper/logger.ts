import winston from 'winston';
// Format console.log
const consoleFormat = winston.format.printf(
  ({ level, message, timestamp }) => {

    const logLevel = winston.format
      .colorize()
      .colorize(level, level.toUpperCase());

    return `${timestamp} ${logLevel}: ${message}`;
  }
);
//logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL,
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        consoleFormat
      )
    })
  ]
});
// print any unknown error 
logger.on('error', (err) => {
  console.error('Unknown error in logger:', err);
  console.log(err.message);
});

export default logger;