import Joi from '@hapi/joi';
import common from '../../models/joiSchema/common';
import constants from '../../constants/constants';
import UserValidation from './user';

let responseObj = {};

class Validation extends UserValidation {
  skipLimit = (req, res, next) => {
    let result = Joi.validate(req.query, common.QueryScheme());
    if (result.error) {
      let error = result.error.details.map(item => {
        return { message: item.message, path: item.path };
      });
      responseObj.status = 400;
      responseObj.message = constants.controllerStatus.BAD_REQUEST;
      responseObj.error = error;
      res.status(400).json(responseObj);
    } else {
      // console.log(req.query.skip, req.query.limit);

      req.query.skip = req.sanitize(req.query.skip);
      req.query.limit = req.sanitize(req.query.limit);
      // console.log(req.query.skip, req.query.limit);
      next();
    }
  };
  pathParams = (req, res, next) => {
    let result = Joi.validate(req.params, common.ParamSachema());
    if (result.error) {
      let error = result.error.details.map(item => {
        return { message: item.message, path: item.path };
      });
      responseObj.status = 400;
      responseObj.message = constants.controllerStatus.BAD_REQUEST;
      responseObj.error = error;
      res.status(400).json(responseObj);
    } else {
      // console.log(req.query.skip, req.query.limit);

      req.params.id = req.sanitize(req.params.id);

      // console.log(req.query.skip, req.query.limit);
      next();
    }
  };
}

let validation = new Validation();
export default validation;
