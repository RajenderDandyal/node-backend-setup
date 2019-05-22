import constants from '../constants/constants';

class CatchErrors {
  catchErrorController = (err, req, res) => {
    if (err.status) {
      return res.status(err.status).json(err); // error from db
    }
    return res
        .status(400)
        .send({
          status: 400,
          message: constants.controllerStatus.BAD_REQUEST,
          error: {error: err.message}
        }); // other error in controller
  };
}

let catchErrors = new CatchErrors();
export default catchErrors;
