/* eslint-disable no-console */
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';

import bodyParser from 'body-parser'
import userRouter from './routes/users';
import authRouter from './routes/auth';

const app: Express = express();

app.use(bodyParser.json())

const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 5000;

if (process.env.ENVIRONMENT === 'dev') {
  app.use((req, res, next) => {
    const requestTime = new Date().toLocaleTimeString('pt-br');

    switch (req.method) {
      case 'GET':
        console.log(`\x1b[42m\x1b[30m[${requestTime} -- ${req.method}]:\x1b[0m ${req.path}`);
        break;
      case 'POST':
        console.log(`\x1b[44m\x1b[30m[${requestTime} -- ${req.method}]:\x1b[0m ${req.path}`);
        break;
      case 'DELETE':
        console.log(`\x1b[41m\x1b[30m[${requestTime} -- ${req.method}]:\x1b[0m ${req.path}`);
        break;
      case 'PUT':
        console.log(`\x1b[46m\x1b[30m[${requestTime} -- ${req.method}]:\x1b[0m ${req.path}`);
        break;
      default:
        console.log(`\x1b[47m\x1b[30m[${requestTime} -- ${req.method}]:\x1b[0m ${req.path}`);
        break;
    }

    next();
  });
}

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(port, () => console.log(`[openlab-client]: server running at http://${host}:${port}`));
