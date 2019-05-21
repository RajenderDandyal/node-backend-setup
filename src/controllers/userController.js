
class UserController {
  createUser = (req, res, next) => {
    try {
      res.send('user controller')
    } catch (e) {
      console.log(e)
    }
  };
}
let userController = new UserController();
export default userController;