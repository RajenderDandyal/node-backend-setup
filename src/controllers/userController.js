import mongoose from 'mongoose';
import User from '../models/databaseModel/User';
import constants from '../constants/constants';
import db from '../db/db';
import isEmpty from 'lodash/isEmpty';
import catchErrors from '../helper/catchErrors';

class UserController {
  test = (req, res, next) => {
    if (isEmpty(req.body)) {
      return res.status(200).json({ success: true, body: {} });
    }
    return res.status(200).json({ success: true, body: req.body });
  };

  createUser = async (req, res, next) => {
    let responseObj = {};
    try {
      let data = req.body;
      //console.log("req.body**", req.body);

      responseObj = await db.insertData(User, data);

      return res.status(responseObj.status).send(responseObj);
    } catch (err) {
      console.log('Something went wrong: Controller: create user', err);
      // responseObj = constants.responseObjError(err);
      return catchErrors.catchErrorController(err, req, res);
    }
  };
  list = async (req, res, next) => {
    let responseObj = {};
    try {
      let data = {
        query: {},
        excludeFields: '-role -__v',
        pagination: isEmpty(req.query)
          ? {}
          : { skip: parseInt(req.query.skip), limit: parseInt(req.query.limit) },
      };
      console.log('req.body**', req.query.skip, req.query.limit);

      responseObj = await db.find(User, data);

      return res.status(responseObj.status).send(responseObj);
    } catch (err) {
      console.log('Something went wrong: Controller: list all user', err);
      // responseObj = constants.responseObjError(err);
      return catchErrors.catchErrorController(err, req, res);
    }
  };
  details = async (req, res, next) => {
    let responseObj = {};
    try {
      let data = {
        query: { _id: mongoose.Types.ObjectId(req.params.id) },
        excludeFields: '-role -__v',
        pagination: {},
      };
      // console.log("req.body**", req.query.skip, req.query.limit);

      responseObj = await db.find(User, data);

      return res.status(responseObj.status).send(responseObj);
    } catch (err) {
      console.log('Something went wrong: Controller: get user details', err);
      // responseObj = constants.responseObjError(err);
      return catchErrors.catchErrorController(err, req, res);
    }
  };
  update = async (req, res, next) => {
    let responseObj = {};
    try {
      let data = {
        query: { _id: mongoose.Types.ObjectId(req.params.id) },
        doc: req.body,
      };
      // console.log("req.body**", req.query.skip, req.query.limit);

      // email is unique .. so if not updating the email .. then filter the email property then call updateOne method
      responseObj = await db.updateOne(User, data);

      return res.status(responseObj.status).send(responseObj);
    } catch (err) {
      console.log('Something went wrong: Controller: get user details', err);
      // responseObj = constants.responseObjError(err);
      return catchErrors.catchErrorController(err, req, res);
    }
  };
  deleteOne = async (req, res, next) => {
    let responseObj = {};
    try {
      let data = {
        query: { _id: mongoose.Types.ObjectId(req.params.id) },
      };
      // console.log("req.body**", req.query.skip, req.query.limit);

      responseObj = await db.deleteOne(User, data);

      return res.status(responseObj.status).send(responseObj);
    } catch (err) {
      console.log('Something went wrong: Controller: get user details', err);
      // responseObj = constants.responseObjError(err);
      return catchErrors.catchErrorController(err, req, res);
    }
  };
}

let userController = new UserController();
export default userController;
