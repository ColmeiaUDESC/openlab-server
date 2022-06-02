/* eslint-disable no-console */
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';

const app: Express = express();

const host = process.env.HOST || 5000;
const port = process.env.PORT || 'localhost';

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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => console.log(`[openlab-client]: server running at http://${host}:${port}`));
