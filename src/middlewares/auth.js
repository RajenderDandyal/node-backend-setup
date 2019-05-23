import jwtToken from "../helper/jwtToken";

class Auth {
  userAuth = (req, res, next) => {
    return jwtToken.validateToken(req, res, next)
  };
  adminAuth = (req, res, next) => {
    next();
  };
}
let auth = new Auth();
export default auth;
