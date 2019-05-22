import Joi from '@hapi/joi';
import userJoi from '../../models/joiSchema/UserJoi';
import constants from '../../constants/constants';

let responseObj = {};

class UserValidation {
  createUser = (req, res, next) => {
    let result = Joi.validate(req.body, userJoi.UserSchema());
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

      req.body.name = req.sanitize(req.body.name);
      req.body.pnone = req.sanitize(req.body.phone);
      //req.body.email = req.sanitize(req.body.email);
      // console.log(req.query.skip, req.query.limit);
      next();
    }
  };
}

let userValidation = new UserValidation();
export default UserValidation;
