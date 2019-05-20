import mongoose from 'mongoose';
import { dataBaseStatus } from '../constants/constants';

let createConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, err => {
      let responseObj = {};
      if (err) {
        responseObj.status = dataBaseStatus.DATABASE_ERROR;
        return reject(responseObj);
      }
      responseObj.status = dataBaseStatus.DATABASE_CONNECT;
      return resolve(responseObj);
    });
  });
};

export { createConnection };
