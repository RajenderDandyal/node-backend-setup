import User from "../models/databaseModel/User";
import constants from "../constants/constants";
import db from "../db/db"

class UserService {
  createUser = async (serviceData) => {
    let responseObj = {}
    try{
      const user = new User({
        name: serviceData.name,
        email: serviceData.email,
        phone: serviceData.phone,
      });

      let responseFromDatabase = await db.insertData(user);
      switch(responseFromDatabase.status) {
        case constants.dataBaseStatus.ENTITY_CREATED:
          responseObj.body = responseFromDatabase.body;
          responseObj.status = constants.serviceStatus.USER_CREATED;
          break;
        default:
          responseObj = constants.responseObjError;
          break
      }
      return responseObj
    }catch(err) {
      console.log('Something went wrong: Service: creat user:', err);
       responseObj = constants.responseObjError;
      return responseObj
    }
  }

}

let userService = new UserService();
export default userService;