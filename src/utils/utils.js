import {dirname} from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));
/* ------------------------------------ - ----------------------------------- */
// import bcrypt from 'bcrypt';
import bcryptjs from 'bcryptjs';

/**
 * funcion que realiza el encriptado de contraseña a través de bcrypt con el método hashSync. 
 * Recibe password sin encriptar,
 * retorna password encriptada
 * @param password tipo string
 * @returns password encriptada/hasheada
 */
export const createHash = password => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

/**
 * 
 * @param {*} user usuario encontrado en base de datos.
 * @param {*} password contraseña proporcionada por el usuario, sin encriptar.
 * @returns boolean
 */
export const isValidPassword = (password, user) => bcryptjs.compareSync(password, user.password);
/* ------------------------------------ - ----------------------------------- */

//Formato de fecha y hora
export const fechaHora = new Date().toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

/**
 * Recibe la fecha de la última conexión y retorna true si han pasado mas de X
 * tiempo desde esa fecha o false si no ha pasado ese tiempo
 * @param {*} lastConnectionDate Date
 * @returns boolean
 */
export const hasBeenMoreThanXTime = (lastConnectionDate) => {
  const dateNow = new Date();
  const diffMs = dateNow - lastConnectionDate;
  const hours48Ms = 48 * 60 * 60 * 1000; //48hs en ms
  const minMs = 60 * 1000; //1 minuto

  return diffMs > minMs; //diferencia es mayor a 48hs en ms
};

