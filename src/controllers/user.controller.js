import Controllers from "./class.controller.js";
import UserService from '../services/user.services.js';
import httpResponse from "../utils/http.response.js";
import { sendMail } from "../services/mailing.service.js";

const userService = new UserService();

export default class UserController extends Controllers{
  constructor(){
    super(userService)
  }

  register = async(req, res, next) =>{
    try {
      const data = await this.service.register(req.body);
      !data ? httpResponse.NotFound(res, data) : httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };

  login = async(req, res, next) =>{
    try {
     const token = await this.service.login(req.body);
      if (token){
        res.cookie('token', token, { httpOnly: true });
        httpResponse.Ok(res, token);
      } else httpResponse.Unauthorized(res, "User o password incorrect")  
    } catch (error) {
      next(error);
    }
  };

  profile = async(req, res, next)=>{
    try {
     if(req.user){
      const { _id } = req.user;
      const user = await this.service.getUserById(_id);
      httpResponse.Ok(res, user);
     } else httpResponse.Unauthorized(res, req.user) 
    } catch (error) {
      next(error);
    }
  };

  generateResetPass = async(req, res, next) => {
    try {
      const user = req.user;
      const token = await userService.generateResetPass(user);
      if(token){
        await sendMail(user, 'resetPass', token);
        res.cookie('tokenpass', token);
        httpResponse.Ok(res, "Email reset pass send OK")
      } else httpResponse.NotFound(res, "error reset pass send") 
    } catch (error) {
      next(error)
    }
  };

  async updatePass(req, res,next){
    try {
      const user = req.user;
      const { pass } = req.body;
      const { tokenpass } = req.cookies;
      if(!tokenpass) return httpResponse.Unauthorized(res, "Unhautorized")
      const updPass = await userService.updatePass(pass, user);
      if(!updPass) return httpResponse.NotFound(res, "error update password")
      res.clearCookie('tokenpass');
      return httpResponse.Ok(res, updPass)
    } catch (error) {
      next(error)
    }
  };

  async updateRole (req, res, next){
    const { id } = req.params;
    const { role } = req.body;

    if(id && role === "premium" || role === "user"){
      const updateRole = await userService.updateRole(id, req.body)
      return httpResponse.Ok(res, updateRole)
    } else {
      return httpResponse.NotFound(res, "ID o role not found")
    }
  };

  checkUsersLastConnection = async(req, res, next) => {
    try {
      const response = await this.service.checkUsersLastConnection();
      if(!response) return httpResponse.NotFound(res, "Error al actualizar los estados")
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };
};