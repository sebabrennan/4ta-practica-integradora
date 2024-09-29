import Services from "./class.services.js";
import UserDaoMongo from "../daos/user.dao.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import configEnv from "../config/env.js";
import { createHash, isValidPassword, hasBeenMoreThanXTime } from "../utils/utils.js";
import CartDaoMongo from "../daos/cart.dao.js";
import UserRepository from "../repository/user.repository.js";
import { sendMail } from "./mailing.service.js";

const userRepository = new UserRepository();

const userDao = new UserDaoMongo();
const cartDao = new CartDaoMongo();

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = "5m") {
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, configEnv.SECRET_KEY_JWT, { expiresIn: time });
    return token;
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getByEmail(email);
      if (!existUser) {
        const cartUser = await cartDao.create();
        if (
          email === configEnv.EMAIL_ADMIN &&
          password === configEnv.PASS_ADMIN
        ) {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "admin",
            cart: cartUser._id,
          });
          await sendMail(user, "register");
          return newUser;
        } else {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            cart: cartUser._id,
            last_connection: new Date()
          });
          await sendMail(user, "register");
          return newUser;
        }
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if (userExist && passValid){ 
        await this.updateLastConnection(userExist._id);
        return this.generateToken(userExist);
      } 
    } catch (error) {
      throw new Error(error);
    }
  }

  getUserById = async (id) => {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   *
   * @param {*} user
   * usuario logueado va a hacer click en un boton |RESTABLECER CONTRASEÑA|. Éste boton llama a un endpoint que tiene esta funcionalidad
   */
  async generateResetPass(user) {
    try {
      return this.generateToken(user, '1h');
    } catch (error) {
      throw new Error(error)
    }
  }

  async updatePass(pass, user){
    try {
      //verificar que la nueva contraseña no sea igual a la anterior
      const isEqual = isValidPassword(pass, user);
      if(isEqual) return null;
      const newPass = createHash(pass);
      return await this.dao.update(user._id, { password: newPass });
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateRole(id, obj){
    const user = await this.getUserById(id);
    if(!user) return null
    return await this.dao.update(id, obj)

  }

  async updateLastConnection(userId) {
    return await this.dao.update(userId, {
      last_connection: new Date(),
    });
  }

  async checkUsersLastConnection(){
    try {
      const usersInactive = [];
      const users = await this.dao.getAll();
      if(users.length > 0){
        for (const user of users) {
          if(
            user.last_connection &&
            hasBeenMoreThanXTime(user.last_connection)
          ){
            await this.dao.update(user._id, {
              active: false
            });
            await sendMail(user, 'updateActive')
            usersInactive.push(user.email);
          }
        }
      }
      return `USUARIOS INACTIVOS = ${usersInactive}`;
    } catch (error) {
      throw new Error(error)
    }
  }
}
