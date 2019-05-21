import Joi from "@hapi/joi";

class UserJoi {
  UserSchema = ()=>{
    return Joi.object().keys({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.number().required()
    })
  }
}
let userJoi = new UserJoi();
export default userJoi;