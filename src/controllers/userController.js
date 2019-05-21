import mongoose from 'mongoose';
import User from '../models/databaseModel/User';
import constants from "../constants/constants";
import userService from "../services/userServices";
import isEmpty from "lodash/isEmpty";

class UserController {
  test = (req, res, next) => {
    if (isEmpty(req.body)) {
      return res.status(200).json({success: true, body: {}})
    }
    return res.status(200).json({success: true, body: req.body})
  };

  createUser = async (req, res, next) => {
    let responseObj = {};
    try {
      let data = req.body;
      console.log("req.body**", req.body);
      // call the service with this data
      let responseFromService = await userService.createUser(data);
      switch(responseFromService.status) {
        case constants.serviceStatus.USER_CREATED:
          responseObj.status = 200;
          responseObj.message = constants.serviceStatus.USER_CREATED;
          responseObj.body = responseFromService.body;
          break;
        default:
          responseObj = constants.responseObjError;
          break
      }
      return res.status(responseObj.status).send(responseObj)
    } catch(err) {
      console.log('Something went wrong: Controller: create user', err);
      responseObj = constants.responseObjError;
      return res.status(responseObj.status).send(responseObj)
    }
  };
}

let userController = new UserController();
export default userController;
