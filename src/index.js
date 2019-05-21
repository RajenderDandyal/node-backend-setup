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


// error handling

// page not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});
// log errors to console
app.use(logErrors);
//
app.use(clientErrorHandler);
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

// log errors to console
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
// error handling for xhr request
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    console.log("xhr request");
    res.status(400).send({ error: err.message })
  } else {
    next(err)
  }
}


let port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
