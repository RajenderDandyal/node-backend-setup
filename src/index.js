import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import compression from 'compression';
import dotEnv from 'dotenv';
import cors from 'cors';
import { createConnection } from './db/crud';
import corsConfig from './utils/corsConfig';
import user from './routes/user';

const app = express();
const env = dotEnv.config();

// connect to mongodb
createConnection()
  .then(res => console.log(res))
  .catch(err => console.log(err));

app.set('trust proxy'); // for nginx reverse proxy X-forwarded-
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

// cors setup
app.use(cors({ origin: corsConfig }));

// routes
app.use('/api/v1/user', user);

let port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
