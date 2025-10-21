import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './modules/routers/index';
import './jobs/scheduler';
dotenv.config();

async function main() {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
  app.use('/', routes);

  app.listen(process.env.NODE_PORT, () => console.log('Server started on', process.env.NODE_PORT));
}

main();
