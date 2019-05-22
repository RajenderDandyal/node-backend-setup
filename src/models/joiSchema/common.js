import Joi from '@hapi/joi';

class Common {
  QueryScheme = () => {
    return Joi.object()
      .keys({
        skip: Joi.string().optional(),
        limit: Joi.string().optional(),
      })
      .and('skip', 'limit');
  };
  ParamSachema = () => {
    return Joi.object().keys({
      id: Joi.string().required(),
    });
  };
}
let common = new Common();
export default common;
