import jwt from 'jsonwebtoken';
import UserService from '../services/user.services.js';
import httpResponse from '../utils/http.response.js';
const userService = new UserService();
import 'dotenv/config'
import configEnv from '../config/env.js'
import { logger } from '../utils/logger.js';

/**
 * Middleware que verifica si el token es válido a través de la cookie 'token'
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const checkAuth = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) return httpResponse.Forbidden(res, "Token vencido") 
  try {
    const decode = jwt.verify(token, configEnv.SECRET_KEY_JWT);
    const user = await userService.getById(decode.userId);
    if (!user) httpResponse.NotFound(res, "User not found")
    //REFRESH TOKEN
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    const tokenExp = decode.exp; // Tiempo de expiración del token
    const timeUntilExp = tokenExp - now; // Tiempo hasta la expiración en segundos

    if (timeUntilExp <= 300) {
      // 300 segundos = 5 minutos
      // Generar un nuevo token con un tiempo de expiración renovado
      const newToken = userService.generateToken(user, "5m");
      logger.info(">>>>>>SE REFRESCÓ EL TOKEN")
      res.cookie('token', newToken, { httpOnly: true }) // Agregar el nuevo token a la cookie
    } else return httpResponse.Forbidden(res, "Token vencido")
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

