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
  insertData = (Model, data)=>{
    return new Promise((resolve, reject)=>{
     try {
       let newDocument = new Model({
           ...data
       });
       newDocument.save().then(doc =>{
         return resolve({status:200, message:constants.dataBaseStatus.ENTITY_CREATED,body:doc})
       }).catch(err=>{
         reject({status:500, message:constants.dataBaseStatus.DATABASE_ERROR, error:err.message})
       })
     }catch (e) {
       console.log('Something went wrong inside: db insertData', e)
       reject({status:500, message:constants.dataBaseStatus.DATABASE_ERROR,error:e.message})
     }
    })
  }
}

let db = new DB();
export default db;
