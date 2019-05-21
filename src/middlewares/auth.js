class Auth {
  userAuth = (req, res, next) => {
    next();
  };
  adminAuth = (req, res, next) => {
    next();
  };
}
let auth = new Auth();
export default auth;
