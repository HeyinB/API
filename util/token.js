
import jwt from "jsonwebtoken";
import { ScretKeys } from "../config/config";



const Time = '30000'

const getToken = function (payLoad) {
  return jwt.sign(payLoad, ScretKeys, { expiresIn: Time });
}


module.exports = {
  getToken
}
