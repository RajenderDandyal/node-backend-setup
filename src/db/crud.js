import mongoose from 'mongoose';
import constants from '../constants/constants';

let createConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, err => {
      let responseObj = {};
      if (err) {
        responseObj.status = constants.dataBaseStatus.DATABASE_ERROR;
        return reject(responseObj);
      }
      responseObj.status = constants.dataBaseStatus.DATABASE_CONNECT;
      return resolve(responseObj);
    });
  });
};

export { createConnection };
