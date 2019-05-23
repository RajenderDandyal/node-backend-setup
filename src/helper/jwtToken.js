import jwt from 'jsonwebtoken'
import constants from '../constants/constants'
import User from "../models/databaseModel/User";
import db from "../db/db";
import isEmpty from "lodash/isEmpty";
import mongoose from "mongoose";

let responseObj = {}

class JwtToken {
  validateToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, token) => {
        if (err) {
          responseObj.message = constants.controllerStatus.INVALID_TOKEN
          responseObj.status = 400;
          responseObj.body = [];
          return res.status(responseObj.status).send(responseObj)
        } else {
          //console.log(token)
          let user = await db.find(User, {query: {_id: mongoose.Types.ObjectId(token._id)}});
          //console.log(Math.floor(Date.now()/1000))
          let notExp = (token.exp - Math.floor(Date.now() / 1000)) > 0;
          //console.log(notExp)
          if (!isEmpty(user.body) && notExp) {
            //console.log(user)
            req.user = user.body[0];
            next()
          } else {
            responseObj.message = constants.controllerStatus.INVALID_TOKEN;
            responseObj.status = 400;
            responseObj.body = [];
            return res.status(responseObj.status).send(responseObj)
          }

        }
      })
    } else {
      responseObj.message = constants.controllerStatus.TOKEN_MISSING
      responseObj.status = 400;
      responseObj.body = [];
      return res.status(responseObj.status).send(responseObj)
    }
  }

  generateBearerToken = async (id) => {
    const token = await jwt.sign({_id: id}, process.env.SECRET_KEY, {expiresIn: 60 * 60});// 1hr exp
    //console.log(token)
    return `Bearer ${token}`;
  }
}

let jwtToken = new JwtToken();
export default jwtToken;