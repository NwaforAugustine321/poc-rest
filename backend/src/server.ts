import app from './app';
import 'dotenv/config';
import logger from './utils/logger';



const port = process.env.PORT || 4000;
const signals = ['SIGINT', 'SIGTERM'];

const server = app.listen(port, async () => {
  try {

    
  logger.info(`Running on port ${port}`);
  } catch (error) {
    console.log(error)
  }
});

const shutdown = async (signal: string) => {
  server.close(async () => {
    logger.info(`Stopped by ${signal}`);
  });
};

signals.forEach((signal) => {
  process.on(signal, () => {
    shutdown(signal);
  });
});
