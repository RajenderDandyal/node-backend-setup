import ControllerConstants from './controllerConstants';

class Constants extends ControllerConstants {
  constructor() {
    super();
    this.responseObjError = (err) => {
      return {
        status: 500,
        message: `Internal server error: ${err.message}`,
        error: err,
      }
    };
  }
}

let constants = new Constants();
export default constants;
