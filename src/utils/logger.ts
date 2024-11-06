import { createLogger, format, transports } from 'winston';
import { v4 as uuidv4 } from 'uuid';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
  ],
});

export const loggerPlugin = {
  async requestDidStart(requestContext) {
    const start = Date.now();
    const query = requestContext.request.query;
    const requestId = uuidv4();
    
    logger.info(`Request started: ID: ${requestId}, Query:\n${query}`);

    return {
      async parsingDidStart() {
        logger.info(`Parsing started! ID: ${requestId}`);
      },
      async validationDidStart() {
        logger.info(`Validation started! ID: ${requestId}`);
      },
      async willSendResponse(requestContext) {
        const duration = Date.now() - start;
        logger.info(`Request completed. ID: ${requestId}, Duration: ${duration}ms`);
      }
    };
  },
};

export default loggerPlugin;
