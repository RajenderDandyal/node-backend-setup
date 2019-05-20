import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import proxy from 'express-http-proxy';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(3000, () => {
  console.log('Listening on prot 3000');
});
