import mongoose from 'mongoose';
import User from '../models/databaseModel/User';
import constants from '../constants/constants';
import db from '../db/db';
import isEmpty from 'lodash/isEmpty';

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
      return res.status(err.status).json(err);
    }
  };
}

let userController = new UserController();
export default userController;
