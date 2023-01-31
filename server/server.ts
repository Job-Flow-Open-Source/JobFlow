import path from 'path';
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ServerError } from './types';

// Import Routers
import userRouter from './routes/userRouter';
import resumeRouter from './routes/resumeRouter';
import applicationRouter from './routes/applicationRouter';

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.static(path.resolve(__dirname, '../client')));

// Mount imported route handlers to specific routers
app.use('/user', userRouter);
app.use('/resume', resumeRouter);
app.use('/application', applicationRouter);

app.use((req: Request, res: Response) =>
  res.status(404).send('The requested page could not be found.')
);

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: ServerError = Object.assign({}, defaultErr, err);
  console.log('Global Error Hander:', errorObj.log);
  return res.status(errorObj.status || 500).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
