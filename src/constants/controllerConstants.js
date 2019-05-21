import ServiceConstants from "./serviceConstants";


class ControllerConstants extends ServiceConstants{
  constructor(){
    super()
    this.controllerStatus = {
      BAD_REQUEST: 'Required field missing',
      TOKEN_MISSING: 'Token is missing',
      INVALID_TOKEN: 'Token is invalid'
    };
  }
}
export default ControllerConstants;