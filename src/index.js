import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import compression from 'compression';
import dotEnv from 'dotenv';
import cors from 'cors';
import db from './db/db';
import helper from './helper/helper';
import user from './routes/user';

const app = express();
const env = dotEnv.config();

// connect to mongodb
db
  .createConnection()
  .then(res => console.log(res))
  .catch(err => console.log(err));

app.set('trust proxy'); // for nginx reverse proxy X-forwarded-
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

// cors setup
app.use(cors({ origin: helper.corsConfig }));

// routes
app.use('/api/v1/user', user);

let port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
