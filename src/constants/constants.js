import ControllerConstants from './controllerConstants';

class Constants extends ControllerConstants {
  constructor() {
    super();
    this.responseObjError = {
      status: 500,
      message: 'Internal server error',
      body: {},
    };
  }
}
let constants = new Constants();
export default constants;
