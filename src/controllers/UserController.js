import ValidateError from '../errors/validation'
import codeError from '../errors/Error'
import BaseController from './BaseController'
import UserHandler from '../handlers/UserHandler'
import { LOGIN_VALIDATION_SCHEMA } from '../validationSchema/Login'
import UserModel from '../models/UserModel'

var userHandler = new UserHandler()
class UserController extends BaseController {
  // login
  async login (req, res, next) {
    let data = req.body
    try {
      let errors = await this.getErrorsParameters(req, LOGIN_VALIDATION_SCHEMA)
      if (errors.length > 0) res.onError(new ValidateError(errors))
      let user = await userHandler.login(data)
      return res.onSuccess(user)
    } catch (error) {
      return res.onError(new ValidateError(error))
    }
  }
  // register
  async register (req, res, next) {
    let data = req.body
    try {
      let errors = await this.getErrorsParameters(req, LOGIN_VALIDATION_SCHEMA)
      if (errors.length > 0) res.onError(new ValidateError(errors))
      let user = await userHandler.register(data)
      return res.onSuccess(user)
    } catch (error) {
      return res.onError(new ValidateError(error))
    }
  }
  // update information by userId
  async updateInfo (req, res, next) {
    const userId = req.userId
    let data = req.body
    try {
      let update = await userHandler.updateInfo(userId, data)
      return res.onSuccess(update)
    } catch (error) {
      return res.onError(new ValidateError(error))
    }
  }
  // get User
  async getUser (req, res, next) {
    try {
      let users = await userHandler.getUser()
      return res.onSuccess(users)
    } catch (error) {
      return res.onError(new ValidateError(error))
    }
  }
  // delete User
  async deleteUser (req, res, next) {
    const { username } = req.body
    try {
      let user = await UserModel.findOne({ username: username })
      if (user) {
        await userHandler.deleteUser(username)
        return res.onSuccess(codeError.SUCCESS)
      } else return res.onError(new ValidateError(codeError.USER_01)) // cannot delete
    } catch (error) {
      return res.onError(new ValidateError(error))
    }
  }
}
export default UserController
