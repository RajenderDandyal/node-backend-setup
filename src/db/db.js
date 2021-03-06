import mongoose from 'mongoose';
import constants from '../constants/constants';
import {isEmpty} from "lodash";

class DB {
  createConnection = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.DATABASE, {useNewUrlParser: true}, err => {
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
  insertData = (Model, data) => {
    return new Promise((resolve, reject) => {
      try {
        let newDocument = new Model({
          ...data,
        });
        newDocument
            .save()
            .then(doc => {
              return resolve({
                status: 200,
                message: constants.dataBaseStatus.ENTITY_CREATED,
                body: doc,
              });
            })
            .catch(err => {
              reject({
                status: 500,
                message: constants.dataBaseStatus.ENTITY_ERROR,
                error: {error: err.message},
              });
            });
      } catch (e) {
        console.log('Something went wrong inside: db insertData', e);
        reject({status: 500, message: constants.dataBaseStatus.ENTITY_ERROR, error: {error: e.message},});
      }
    });
  };
  find = (model, data) => {
    return new Promise((resolve, reject) => {
      try {
        model
            .find(data.query, data.excludeFields, data.pagination)
            .then(docs => {
              if (isEmpty(docs)){
                return resolve({
                  status: 200,
                  message: constants.dataBaseStatus.DATA_NOTHING_FOUND,
                  body: []
                });
              }
              return resolve({
                status: 200,
                message: constants.dataBaseStatus.DATA_FETCHED,
                body: docs,
              });
            })
            .catch(err => {
              reject({
                status: 500,
                message: constants.dataBaseStatus.DATA_FETCH_ERROR,
                error: {error: err.message},
              });
            });
      } catch (e) {
        console.log('Something went wrong inside: db insertData', e);
        reject({
          status: 500,
          message: constants.dataBaseStatus.DATA_FETCH_ERROR,
          error: {error: e.message},
        });
      }
    });
  };
  // by default we are updating the complete document as received from the client
  // if document have unique property on some path -- and sending the complete document to update --then don't use this
  // use only if updating the unique path also along with other paths.
  updateOne = (model, data) => {
    return new Promise((resolve, reject) => {
      try {
        model
            .findByIdAndUpdate(data.query, data.doc, {new: true, runValidators: false})
            .then(docs => {
              if (isEmpty(docs)){
                return reject({
                  status: 400,
                  message: constants.dataBaseStatus.DATA_FETCH_ERROR,
                  error: {error: "data not found"},
                });
              }
              return resolve({
                status: 200,
                message: constants.dataBaseStatus.ENTITY_MODIFIED,
                body: docs,
              });
            })
            .catch(err => {
              reject({
                status: 500,
                message: constants.dataBaseStatus.DATA_FETCH_ERROR,
                error: {error: err.message},
              });
            });
      } catch (e) {
        console.log('Something went wrong inside: db insertData', e);
        reject({
          status: 500,
          message: constants.dataBaseStatus.DATA_FETCH_ERROR,
          error: {error: e.message},
        });
      }
    });
  };
  deleteOne = (model, data) => {
    return new Promise((resolve, reject) => {
      try {
        model
            .findByIdAndRemove(data.query)
            .then(docs => {
              if (isEmpty(docs)){
                return reject({
                  status: 400,
                  message: constants.dataBaseStatus.DATA_FETCH_ERROR,
                  error: {error: "data not found"},
                });
              }
              return resolve({
                status: 200,
                message: constants.dataBaseStatus.ENTITY_DELETED,
                body: docs,
              });
            })
            .catch(err => {
              reject({
                status: 500,
                message: constants.dataBaseStatus.DATA_FETCH_ERROR,
                error: {error: err.message},
              });
            });
      } catch (e) {
        console.log('Something went wrong inside: db insertData', e);
        reject({
          status: 500,
          message: constants.dataBaseStatus.DATA_FETCH_ERROR,
          error: {error: e.message},
        });
      }
    });
  };
}

let db = new DB();
export default db;
