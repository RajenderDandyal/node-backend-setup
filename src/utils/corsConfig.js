let allowedOrigins = ['http://localhost:3000', 'http://myFrontEndApi.com'];

let corsConfig = (origin, callback) => {
  // allow requests with no origin
  // (like mobile apps or curl requests)
  if (!origin) return callback(null, true);
  if (allowedOrigins.indexOf(origin) === -1) {
    let msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
    return callback(new Error(msg), false);
  }
  return callback(null, true);
};

export default corsConfig;
