import { createTransport } from "nodemailer";
import configEnv from "../config/env.js";

const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: configEnv.GMAIL_ACCOUNT,
    pass: configEnv.GMAIL_PASS
  },
});

const createMsgRegister = (first_name) =>
  `<h1>Hola ${first_name}, ¡Bienvenido/a a Coderhouse!</h1>`;

const createMsgReset = (first_name) => {
  return `<p>¡Hola ${first_name}! Hacé click <a href="http://localhost:8080/new-pass">AQUÍ</a> 
    para restablecer tu contraseña.
    </p>`;
};

/**
 * 
 * @param {*} user 
 * @param {*} service register | resetPass
 * @param {*} token 
 * @returns 
 */
export const sendMail = async (user, service, token = null) => {
  try {
    const { first_name, email } = user;

    let msg = "";

    service === "register"
      ? (msg = createMsgRegister(first_name))
      : service === "resetPass"
      ? (msg = createMsgReset(first_name))
      : (msg = "");

    let subj = "";

    subj =
      service === "register"
        ? "Bienvenido/a"
        : service === "resetPass"
        ? "Restablecimiento de contraseña"
        : "";

    const gmailOptions = {
      from: configEnv.EMAIL_ADMIN,
      to: email,
      subject: subj,
      html: msg,
    };

    const response = await transporter.sendMail(gmailOptions);
    if (token) return token;
  } catch (error) {
    throw new Error(error);
  }
};
