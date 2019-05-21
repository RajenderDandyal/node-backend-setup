import mongoose from 'mongoose';
import constants from '../constants/constants';

class DB {
  createConnection = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, err => {
        let responseObj = {};
        if (err) {
          responseObj.status = constants.dataBaseStatus.DATABASE_ERROR;
          return reject(responseObj);
        }
        responseObj.status = constants.dataBaseStatus.DATABASE_CONNECT;
        return resolve(responseObj);
      });
    });
  };
  insertData = (model)=>{
    return new Promise((resolve, reject)=>{
     try {
       model.save().then(doc =>{
         return resolve({body:doc, status:constants.dataBaseStatus.ENTITY_CREATED})
       }).catch(err=>{
         reject({error:err.message, status:constants.dataBaseStatus.DATABASE_ERROR})
       })
     }catch (e) {
       console.log('Something went wrong inside: db insertData', e)
       reject({error:e.message, status:constants.dataBaseStatus.DATABASE_ERROR})
     }
    })
  }
}

let db = new DB();
export default db;
