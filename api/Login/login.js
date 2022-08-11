
import * as sequelize from 'sequelize'
import db from '../../db/db'
import tools from '../../util/tools'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ScretKeys } from '../../config/config'

//登录
export async function LoginOrRegister(model) {

}



//刷新token
export async function refreshToken(model) {
  return model
}
