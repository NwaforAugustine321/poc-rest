import logger from './utils/logger';
import express, { Application, Response, Request } from 'express';
import winstonMiddleware from 'express-winston';
import {
  allowedHeaders,
  allowedHttpMethods,
} from './middlewares/app.middleware';
import cors from 'cors';
import usersRoute from './routers/user.router';
import musicRoute from './routers/music.router';



const app: Application = express();

app.use(allowedHttpMethods);
app.use(allowedHeaders);


app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    optionsSuccessStatus: 200,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  winstonMiddleware.logger({
    winstonInstance: logger,
    level: (req: Request, res: Response) => {
      let level = 'info';
      if (res.statusCode >= 500) {
        level = 'error';
      } else if (res.statusCode >= 300) {
        level = 'warn';
      }
      return level;
    },
  })
);

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Server is up',
  });
});

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/music', musicRoute);



export default app;
